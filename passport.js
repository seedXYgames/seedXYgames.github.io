    // Passport reactive sync
    window.addEventListener('seedxy:state-changed', (e) => {
      const { isLoggedIn, user, tdsProgress, thsProgress, saveData } = e.detail;
      const guestView = document.getElementById('passport-guest-view');
      const userView = document.getElementById('passport-user-view');
      const navBtn = document.getElementById('nav-auth-btn');

      if (!isLoggedIn || !user) {
        if (guestView) guestView.style.display = 'block';
        if (userView) userView.style.display = 'none';
        if (navBtn) navBtn.textContent = 'Accedi ↗';
        return;
      }

      if (guestView) guestView.style.display = 'none';
      if (userView) userView.style.display = 'block';
      if (navBtn) navBtn.textContent = '' + (user.name || user.login);

      document.getElementById('pp-avatar').src = user.avatar || '';
      document.getElementById('pp-name').textContent = user.name || user.login;
      document.getElementById('pp-login').textContent = '@' + user.login;

      const tdsShifts = tdsProgress?.completed || 0;
      const thsShifts = thsProgress?.completed || 0;
      const totalShifts = tdsShifts + thsShifts;
      const distKm = (((tdsProgress?.totals?.meters || 0) + (thsProgress?.totals?.meters || 0)) / 1000).toFixed(1);
      const totalTasks = (tdsProgress?.totals?.reports || 0) + (thsProgress?.totals?.tasks || 0);
      
      const tdsAchCount = Object.keys(tdsProgress?.unlocked || {}).length;
      const thsAchCount = Object.keys(thsProgress?.unlocked || {}).length;
      const totalAch = tdsAchCount + thsAchCount;

      document.getElementById('pp-stat-shifts').textContent = totalShifts;
      document.getElementById('pp-stat-dist').textContent = distKm + ' km';
      document.getElementById('pp-stat-tasks').textContent = totalTasks;
      document.getElementById('pp-stat-ach').textContent = totalAch;

      document.getElementById('pp-dark-badge').textContent = tdsShifts + ' turni';
      document.getElementById('pp-hosp-badge').textContent = thsShifts + ' turni';

      // Render Dark Seed achievements
      const darkContainer = document.getElementById('pp-dark-achs');
      if (darkContainer) {
        const u = Object.keys(tdsProgress?.unlocked || {});
        if (u.length === 0) {
          darkContainer.innerHTML = '<span class="passport-ach-badge">Nessun obiettivo ancora</span>';
        } else {
          darkContainer.innerHTML = u.map(k => `<span class="passport-ach-badge unlocked">🌲 ${k}</span>`).join('');
        }
      }

      // Render Hospital Seed achievements
      const hospContainer = document.getElementById('pp-hosp-achs');
      if (hospContainer) {
        const u = Object.keys(thsProgress?.unlocked || {});
        if (u.length === 0) {
          hospContainer.innerHTML = '<span class="passport-ach-badge">Nessun obiettivo ancora</span>';
        } else {
          hospContainer.innerHTML = u.map(k => `<span class="passport-ach-badge unlocked">🏥 ${k}</span>`).join('');
        }
      }
    });
