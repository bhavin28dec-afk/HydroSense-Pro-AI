
import React, { useState, useEffect } from 'react';
import { Language, UserAccount } from '../types';

const AdminSettings: React.FC<{ language: Language }> = ({ language }) => {
  // State for adding user
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRenewDays, setNewRenewDays] = useState(30);
  
  // State for user list
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [msg, setMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Modal State
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: 'renew' | 'password' | 'delete' | null;
    username: string;
    inputValue: string;
  }>({ isOpen: false, type: null, username: '', inputValue: '' });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    const stored = localStorage.getItem('hydro_users');
    if (stored) {
      setUsers(JSON.parse(stored));
    }
  };

  const showMsg = (text: string, type: 'success' | 'error') => {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3000);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newPassword) {
      showMsg('Please fill username and password', 'error');
      return;
    }

    if (users.some(u => u.username === newUsername)) {
      showMsg('User ID already exists', 'error');
      return;
    }

    const newUser: UserAccount = {
      username: newUsername,
      password: newPassword,
      createdDate: new Date().toISOString(),
      expiryDate: new Date(Date.now() + newRenewDays * 24 * 60 * 60 * 1000).toISOString(),
      isActive: true
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem('hydro_users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setNewUsername('');
    setNewPassword('');
    setNewRenewDays(30);
    showMsg(`User added with ${newRenewDays} days validity!`, 'success');
  };

  const openModal = (type: 'renew' | 'password' | 'delete', username: string, defaultValue: string = '') => {
    setModalConfig({ isOpen: true, type, username, inputValue: defaultValue });
  };

  const closeModal = () => {
    setModalConfig({ isOpen: false, type: null, username: '', inputValue: '' });
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { type, username, inputValue } = modalConfig;

    if (type === 'delete') {
      const updatedUsers = users.filter(u => u.username !== username);
      localStorage.setItem('hydro_users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      showMsg('User deleted', 'success');
    } else if (type === 'renew') {
      const days = parseInt(inputValue, 10);
      if (isNaN(days) || days <= 0) {
        showMsg('Invalid number of days', 'error');
        return;
      }
      const updatedUsers = users.map(u => {
        if (u.username === username) {
          const currentExpiry = new Date(u.expiryDate);
          const baseDate = currentExpiry > new Date() ? currentExpiry : new Date();
          return {
            ...u,
            expiryDate: new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000).toISOString()
          };
        }
        return u;
      });
      localStorage.setItem('hydro_users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      showMsg(`Validity extended by ${days} days for ${username}`, 'success');
    } else if (type === 'password') {
      if (!inputValue) {
        showMsg('Password cannot be empty', 'error');
        return;
      }
      const updatedUsers = users.map(u => u.username === username ? { ...u, password: inputValue } : u);
      localStorage.setItem('hydro_users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      showMsg(`Password updated for ${username}`, 'success');
    }
    closeModal();
  };

  const handleToggleActive = (username: string) => {
    const updatedUsers = users.map(u => {
      if (u.username === username) {
        return { ...u, isActive: u.isActive === false ? true : false };
      }
      return u;
    });
    localStorage.setItem('hydro_users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    showMsg(`Status updated for ${username}`, 'success');
  };

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const t = {
    en: {
      title: "Admin Panel 🛡️",
      sub: "User Access Management",
      addUserTitle: "Add New User",
      userListTitle: "Existing Users",
      username: "Login ID",
      password: "Password",
      days: "Validity (Days)",
      createBtn: "Create User",
      expires: "Expires",
      status: "Status",
      action: "Actions",
      active: "Active",
      expired: "Expired",
      deactivated: "Deactivated",
      renewBtn: "Renew",
      deleteBtn: "Delete",
      changePassBtn: "Change Pwd",
      deactivateBtn: "Deactivate",
      activateBtn: "Activate",
      cancel: "Cancel",
      confirm: "Confirm",
      renewTitle: "Renew User",
      passTitle: "Change Password",
      deleteTitle: "Delete User",
      renewDesc: "Enter days to extend validity for",
      passDesc: "Enter new password for",
      deleteDesc: "Are you sure you want to delete"
    },
    hi: {
      title: "एडमिन पैनल 🛡️",
      sub: "यूजर एक्सेस मैनेजमेंट",
      addUserTitle: "नया यूजर जोड़ें",
      userListTitle: "मौजूदा यूजर्स",
      username: "लॉगिन आईडी",
      password: "पासवर्ड",
      days: "वैधता (दिन)",
      createBtn: "यूजर बनाएं",
      expires: "समाप्त",
      status: "स्थिति",
      action: "कार्य",
      active: "सक्रिय",
      expired: "समाप्त (Expired)",
      deactivated: "निष्क्रिय",
      renewBtn: "नवीनीकरण",
      deleteBtn: "हटाएं",
      changePassBtn: "पासवर्ड बदलें",
      deactivateBtn: "निष्क्रिय करें",
      activateBtn: "सक्रिय करें",
      cancel: "रद्द करें",
      confirm: "पुष्टि करें",
      renewTitle: "यूजर नवीनीकरण",
      passTitle: "पासवर्ड बदलें",
      deleteTitle: "यूजर हटाएं",
      renewDesc: "वैधता बढ़ाने के लिए दिन दर्ज करें:",
      passDesc: "नया पासवर्ड दर्ज करें:",
      deleteDesc: "क्या आप वाकई हटाना चाहते हैं:"
    }
  }[language];

  return (
    <div className="space-y-6 pb-20">
      <div className="bg-slate-800 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
         <div className="relative z-10">
            <h2 className="text-3xl font-black mb-2">{t.title}</h2>
            <p className="text-slate-300 font-medium">{t.sub}</p>
         </div>
         <div className="absolute right-[-20px] top-[-30px] opacity-10 text-[150px]">🔒</div>
      </div>

      {/* Message Banner */}
      {msg && (
        <div className={`p-4 rounded-xl font-bold text-center animate-fade-in ${msg.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
          {msg.text}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* ADD USER FORM */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-fit">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-600 w-8 h-8 flex items-center justify-center rounded-lg text-sm">＋</span>
            {t.addUserTitle}
          </h3>
          <form onSubmit={handleAddUser} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t.username}</label>
                <input 
                    type="text" 
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="e.g. farmer01"
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t.password}</label>
                <input 
                    type="text" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Set password"
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t.days}</label>
                <input 
                    type="number" 
                    value={newRenewDays}
                    onChange={(e) => setNewRenewDays(parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="30"
                />
            </div>
            <button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold shadow-lg transition-all"
            >
                {t.createBtn}
            </button>
          </form>
        </div>

        {/* USER LIST */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 w-8 h-8 flex items-center justify-center rounded-lg text-sm">👥</span>
            {t.userListTitle}
          </h3>
          
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {users.length === 0 && (
              <p className="text-slate-400 text-sm text-center py-4">No users found.</p>
            )}

            {users.map((user) => {
              const expiry = new Date(user.expiryDate);
              const today = new Date();
              const isExpired = today > expiry;
              
              // Calculate calendar days left
              const expiryDateOnly = new Date(expiry.getFullYear(), expiry.getMonth(), expiry.getDate());
              const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
              const daysLeft = Math.max(0, Math.round((expiryDateOnly.getTime() - todayDateOnly.getTime()) / (1000 * 60 * 60 * 24)));
              const isDeactivated = user.isActive === false;
              
              return (
                <div key={user.username} className={`border rounded-xl p-4 transition-colors ${isDeactivated ? 'bg-slate-100 border-slate-200 opacity-75' : 'bg-slate-50/50 border-slate-100 hover:border-emerald-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-slate-800">{user.username}</h4>
                      <p className="text-xs text-slate-500 font-mono">Pwd: {user.password}</p>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      {isDeactivated ? (
                        <span className="px-2 py-1 rounded text-[10px] font-bold uppercase bg-slate-200 text-slate-600">
                          {t.deactivated}
                        </span>
                      ) : (
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${isExpired ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                          {isExpired ? t.expired : t.active}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <span>⏳ {isExpired ? 'Expired on:' : 'Expires:'} <strong className="text-slate-700">{formatDate(user.expiryDate)}</strong></span>
                    {!isExpired && <span className="text-emerald-600 font-bold">({daysLeft} days left)</span>}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => openModal('renew', user.username, '30')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-2 rounded-lg text-[11px] font-bold shadow-sm"
                    >
                      {t.renewBtn}
                    </button>
                    <button 
                      onClick={() => openModal('password', user.username)}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 px-2 rounded-lg text-[11px] font-bold shadow-sm"
                    >
                      {t.changePassBtn}
                    </button>
                    <button 
                      onClick={() => handleToggleActive(user.username)}
                      className={`flex-1 py-2 px-2 rounded-lg text-[11px] font-bold shadow-sm text-white ${isDeactivated ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-slate-500 hover:bg-slate-600'}`}
                    >
                      {isDeactivated ? t.activateBtn : t.deactivateBtn}
                    </button>
                    <button 
                      onClick={() => openModal('delete', user.username)}
                      className="px-3 bg-red-100 hover:bg-red-200 text-red-600 py-2 rounded-lg text-xs font-bold"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Custom Modal */}
      {modalConfig.isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-fade-in">
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {modalConfig.type === 'renew' ? t.renewTitle : modalConfig.type === 'password' ? t.passTitle : t.deleteTitle}
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                {modalConfig.type === 'renew' ? `${t.renewDesc} ${modalConfig.username}:` : 
                 modalConfig.type === 'password' ? `${t.passDesc} ${modalConfig.username}:` : 
                 `${t.deleteDesc} ${modalConfig.username}?`}
              </p>
              
              <form onSubmit={handleModalSubmit}>
                {modalConfig.type !== 'delete' && (
                  <input
                    type={modalConfig.type === 'renew' ? 'number' : 'text'}
                    value={modalConfig.inputValue}
                    onChange={(e) => setModalConfig({...modalConfig, inputValue: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-semibold outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
                    placeholder={modalConfig.type === 'renew' ? t.days : t.password}
                    autoFocus
                  />
                )}
                <div className="flex gap-3">
                  <button type="button" onClick={closeModal} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-bold transition-colors">
                    {t.cancel}
                  </button>
                  <button type="submit" className={`flex-1 text-white py-3 rounded-xl font-bold shadow-md transition-colors ${modalConfig.type === 'delete' ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>
                    {modalConfig.type === 'delete' ? t.deleteBtn : t.confirm}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
