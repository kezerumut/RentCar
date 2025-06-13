import React, { useEffect, useState } from "react";
import './UserManagement.css'; 

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [histories, setHistories] = useState({});
  const [modalUserId, setModalUserId] = useState(null);
  const [deleteLoadingIds, setDeleteLoadingIds] = useState(new Set());
  const [deleteErrorIds, setDeleteErrorIds] = useState({}); 

  
  useEffect(() => {
    fetch("http://localhost/rentcar-api/get_users.php")
      .then(res => {
        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("application/json")) {
          return res.text().then(txt => {
            console.error("get_users.php JSON değil:", txt);
            throw new Error("Beklenmeyen yanıt get_users");
          });
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (data.success && Array.isArray(data.data)) {
          setUsers(data.data);
        } else {
          console.error("get_users beklenen formda dönmedi:", data);
        }
      })
      .catch(err => console.error("Kullanıcı çekme hatası:", err));
  }, []);

  const fetchUserHistory = (userId) => {
    const existing = histories[userId];
    if (existing && (existing.loading || existing.data)) {
      return;
    }
   
    setHistories(prev => ({
      ...prev,
      [userId]: { data: null, loading: true, error: null }
    }));

    fetch(`http://localhost/rentcar-api/get_user_history.php?user_id=${userId}`)
      .then(res => {
        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("application/json")) {
          return res.text().then(txt => {
            console.error("get_user_history JSON değil (user " + userId + "):", txt);
            throw new Error("Beklenmeyen yanıt get_user_history");
          });
        }
        return res.json();
      })
      .then(resp => {
        if (!resp.success) {
          console.error("API hata:", resp.message);
          setHistories(prev => ({
            ...prev,
            [userId]: { data: [], loading: false, error: resp.message }
          }));
        } else {
        
          setHistories(prev => ({
            ...prev,
            [userId]: { data: resp.data, loading: false, error: null }
          }));
        }
      })
      .catch(err => {
        console.error("Sipariş geçmişi fetch hatası (user " + userId + "):", err);
        setHistories(prev => ({
          ...prev,
          [userId]: { data: [], loading: false, error: err.message || "Hata oluştu" }
        }));
      });
  };

 
  const openHistoryModal = (userId) => {
    setModalUserId(userId);
    
    fetchUserHistory(userId);
  };
  const closeHistoryModal = () => {
    setModalUserId(null);
  };


  const deleteUser = (userId) => {
    const confirmed = window.confirm("Bu kullanıcıyı silmek istediğinizden emin misiniz? Tüm ilişkili veriler kaybolabilir.");
    if (!confirmed) return;

    setDeleteLoadingIds(prev => new Set(prev).add(userId));
    setDeleteErrorIds(prev => {
      const nxt = { ...prev };
      delete nxt[userId];
      return nxt;
    });

    fetch(`http://localhost/rentcar-api/delete_user.php?user_id=${userId}`, {
      method: 'DELETE'  
    })
      .then(res => {
        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("application/json")) {
          return res.text().then(txt => {
            console.error("delete_user JSON değil:", txt);
            throw new Error("Beklenmeyen yanıt delete_user");
          });
        }
        return res.json();
      })
      .then(resp => {
        if (!resp.success) {
          throw new Error(resp.message || "Silme başarısız");
        }
      
        setUsers(prev => prev.filter(u => u.id !== userId));
      
        if (modalUserId === userId) {
          closeHistoryModal();
        }
      })
      .catch(err => {
        console.error("Kullanıcı silme hatası:", err);
        setDeleteErrorIds(prev => ({ ...prev, [userId]: err.message || "Silme hatası" }));
      })
      .finally(() => {
        setDeleteLoadingIds(prev => {
          const nxt = new Set(prev);
          nxt.delete(userId);
          return nxt;
        });
      });
  };

  return (
    <div className="um-container">
      <h2 className="um-title">Kullanıcılar</h2>
      {users.length === 0 ? (
        <p className="um-loading">Yükleniyor veya kullanıcı yok.</p>
      ) : (
        <div className="um-list">
          {users.map((user) => (
            <div key={user.id} className="um-user-card">
              <div className="um-user-info">
                <span className="um-username">{user.username}</span>
                <span className="um-userid">ID: {user.id}</span>
              </div>
              <div className="um-actions">
                <button
                  className="um-btn um-btn-history"
                  onClick={() => openHistoryModal(user.id)}
                >
                  Geçmişi Göster
                </button>
                <button
                  className="um-btn um-btn-delete"
                  onClick={() => deleteUser(user.id)}
                  disabled={deleteLoadingIds.has(user.id)}
                >
                  {deleteLoadingIds.has(user.id) ? "Siliniyor..." : "Kullanıcıyı Sil"}
                </button>
              </div>
              {deleteErrorIds[user.id] && (
                <p className="um-delete-error">Hata: {deleteErrorIds[user.id]}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {modalUserId !== null && (
        <div className="um-modal-overlay" onClick={closeHistoryModal}>
          <div className="um-modal-content" onClick={e => e.stopPropagation()}>
            <div className="um-modal-header">
              <h3>#{modalUserId} Kullanıcı Geçmişi</h3>
              <button className="um-modal-close" onClick={closeHistoryModal}>✕</button>
            </div>
            <div className="um-modal-body">
              {histories[modalUserId]?.loading ? (
                <p>Yükleniyor...</p>
              ) : histories[modalUserId]?.error ? (
                <p className="um-history-error">Hata: {histories[modalUserId].error}</p>
              ) : histories[modalUserId]?.data && histories[modalUserId].data.length > 0 ? (
                <table className="um-history-table">
                  <thead>
                    <tr>
                      <th>Araba</th>
                      <th>Tarih</th>
                      <th>Saat</th>
                      <th>Kiralama Zamanı</th>
                    </tr>
                  </thead>
                  <tbody>
                    {histories[modalUserId].data.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.car_name}</td>
                        <td>{item.tarih || item.rent_date || "-"}</td>
                        <td>{item.saat || item.rent_time || "-"}</td>
                        <td>{item.created_at || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Hiç sipariş yok.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
