// 在浏览器控制台显示美观的 AUNyaの小窝
(function() {
    // 添加一些装饰性的线条
    console.log(
        '%c═══════════════════════════════════════════════════',
        'color: #4ecdc4; font-weight: bold;'
    );
    
    // 使用 ASCII 艺术风格
    console.log(`
%c   █████╗ ██╗   ██╗███╗   ██╗██╗   ██╗ █████╗ 
  ██╔══██╗██║   ██║████╗  ██║╚██╗ ██╔╝██╔══██╗
  ███████║██║   ██║██╔██╗ ██║ ╚████╔╝ ███████║
  ██╔══██║██║   ██║██║╚██╗██║  ╚██╔╝  ██╔══██║
  ██║  ██║╚██████╔╝██║ ╚████║   ██║   ██║  ██║
  ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝
    `, 'color: #ff9ff3; font-family: monospace;');
    
    
    // 彩虹效果
    const colors = ['#ff6b6b', '#ff9ff3', '#feca57', '#48dbfb', '#1dd1a1', '#54a0ff'];
    const text = '✨ 欢迎来到 AUNyaの小窝 ✨';
    let coloredText = '';
    
    text.split('').forEach((char, index) => {
        if (char !== ' ') {
            coloredText += `%c${char}`;
        } else {
            coloredText += ' ';
        }
    });
    
    const styleArgs = [];
    let colorIndex = 0;
    
    text.split('').forEach((char, index) => {
        if (char !== ' ') {
            styleArgs.push(`font-size: 24px; font-weight: bold; color: ${colors[colorIndex % colors.length]};`);
            colorIndex++;
        }
    });
    
    console.log(coloredText, ...styleArgs);
    
    // 最后添加一个分隔线
    console.log(
        '%c═══════════════════════════════════════════════════',
        'color: #4ecdc4; font-weight: bold;'
    );
})();