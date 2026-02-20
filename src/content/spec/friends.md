
## 🍀本站信息

申请友链前请先在自己网站添加本站友链，请使用以下信息：

```yaml
站点名称: AUNyaの小窝
站点描述: 一个热爱二次元的小萌新~
站点链接: https://tbmiao.dpdns.org/
头像链接: https://avatars.githubusercontent.com/u/172878250?v=4

```
`

## ✉️申请友链

请填写以下表单提交友链申请，或发送邮件至：`init@tbmiao.dpdns.org`

<form id="friend-link-form" class="friend-link-form">
  <div class="form-group">
    <label for="siteName">站点名称 <span class="required">*</span></label>
    <input type="text" id="siteName" name="siteName" required placeholder="您的站点名称" />
  </div>
  <div class="form-group">
    <label for="siteDescription">站点描述</label>
    <textarea id="siteDescription" name="siteDescription" rows="3" placeholder="简短描述您的站点"></textarea>
  </div>
  <div class="form-group">
    <label for="siteUrl">站点链接 <span class="required">*</span></label>
    <input type="url" id="siteUrl" name="siteUrl" required placeholder="https://example.com" />
  </div>
  <div class="form-group">
    <label for="avatarUrl">头像链接 <span class="required">*</span></label>
    <input type="url" id="avatarUrl" name="avatarUrl" required placeholder="https://example.com/avatar.png" />
  </div>
  <button type="submit" class="submit-btn">提交申请</button>
  <p id="form-message" class="form-message"></p>
</form>

<style>
  .friend-link-form {
    max-width: 500px;
    margin: 20px 0;
    padding: 20px;
    background: var(--card-bg, #f8f9fa);
    border-radius: 12px;
    border: 1px solid var(--border-color, #e9ecef);
  }
  .form-group {
    margin-bottom: 16px;
  }
  .form-group label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    color: var(--text-color, #333);
  }
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--border-color, #ddd);
    border-radius: 8px;
    font-size: 14px;
    background: var(--input-bg, #fff);
    color: var(--text-color, #333);
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }
  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #4a9eff;
    box-shadow: 0 0 0 3px rgba(74, 158, 255, 0.15);
  }
  .required {
    color: #e74c3c;
  }
  .submit-btn {
    width: 100%;
    padding: 12px 20px;
    background: linear-gradient(135deg, #4a9eff, #6c5ce7);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(74, 158, 255, 0.3);
  }
  .submit-btn:active {
    transform: translateY(0);
  }
  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  .form-message {
    margin-top: 12px;
    padding: 10px;
    border-radius: 6px;
    text-align: center;
    display: none;
  }
  .form-message.success {
    display: block;
    background: #d4edda;
    color: #155724;
  }
  .form-message.error {
    display: block;
    background: #f8d7da;
    color: #721c24;
  }
</style>

<script>
  document.getElementById('friend-link-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = this;
    const submitBtn = form.querySelector('.submit-btn');
    const messageEl = document.getElementById('form-message');
    
    const data = {
      siteName: document.getElementById('siteName').value.trim(),
      siteDescription: document.getElementById('siteDescription').value.trim(),
      siteUrl: document.getElementById('siteUrl').value.trim(),
      avatarUrl: document.getElementById('avatarUrl').value.trim()
    };
    
    submitBtn.disabled = true;
    submitBtn.textContent = '提交中...';
    messageEl.className = 'form-message';
    messageEl.textContent = '';
    
    try {
      const response = await fetch('/api/friend-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (result.success) {
        messageEl.className = 'form-message success';
        messageEl.textContent = result.message;
        form.reset();
      } else {
        messageEl.className = 'form-message error';
        messageEl.textContent = result.message;
      }
    } catch (error) {
      messageEl.className = 'form-message error';
      messageEl.textContent = '网络错误，请稍后重试';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = '提交申请';
    }
  });
</script>

**邮件标题**：`友链申请 - [您的站点名称]`

**邮件内容模板**：

```
站点信息：
- 站点名称：[您的站点名称]
- 站点描述：[您的站点描述]
- 站点链接：[您的站点链接]
- 头像链接：[您的头像链接]
```