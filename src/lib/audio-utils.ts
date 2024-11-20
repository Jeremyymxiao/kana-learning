export const playCorrectSound = () => {
    const audioContext = new (window.AudioContext || (window as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    
    // 创建振荡器
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // 设置音频参数
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // 高音
    oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.1); // 更高音
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    // 连接节点
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // 播放声音
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };
  
  export const playWrongSound = () => {
    const audioContext = new (window.AudioContext || (window as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    
    // 创建振荡器
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // 设置音频参数
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime); // 低音
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.2); // 更低音
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    // 连接节点
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // 播放声音
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };