async function updateStatus() {
  try {
    const res = await fetch('http://localhost:3000/status');
    const data = await res.json();
    const img = document.getElementById('status-img');
    switch (data.status) {
      case 'online':
        img.src = 'green.png';
        break;
      case 'idle':
        img.src = 'yellow.png';
        break;
      case 'dnd':
        img.src = 'red.png';
        break;
      default:
        img.src = 'grey.png';
    }
  } catch (e) {
    console.error('Error fetching status:', e);
  }
}

setInterval(updateStatus, 5000);
updateStatus();
