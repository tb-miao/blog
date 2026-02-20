import type { APIRoute } from 'astro';

interface FriendLinkData {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  avatarUrl: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: FriendLinkData = await request.json();

    if (!data.siteName || !data.siteUrl || !data.avatarUrl) {
      return new Response(
        JSON.stringify({ success: false, message: '请填写完整的站点信息' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const smtpHost = import.meta.env.SMTP_HOST || 'smtp.qq.com';
    const smtpPort = parseInt(import.meta.env.SMTP_PORT || '465');
    const smtpUser = import.meta.env.SMTP_USER || 'maoca@foxmail.com';
    const smtpPass = import.meta.env.SMTP_PASS;
    const emailTo = import.meta.env.FRIEND_EMAIL_TO || 'init@tbmiao.dpdns.org';

    if (!smtpUser || !smtpPass) {
      return new Response(
        JSON.stringify({ success: false, message: '服务器邮件配置不完整' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const nodemailer = await import('nodemailer');

    const transporter = nodemailer.default.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: smtpUser,
      to: emailTo,
      subject: `友链申请 - ${data.siteName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; border-radius: 10px;">
          <h2 style="color: #333; border-bottom: 2px solid #4a9eff; padding-bottom: 10px;">🔗 新的友链申请</h2>
          <div style="background-color: #fff; padding: 20px; border-radius: 8px; margin-top: 15px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 100px; color: #666;">站点名称</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${data.siteName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">站点描述</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">${data.siteDescription || '未填写'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">站点链接</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                  <a href="${data.siteUrl}" style="color: #4a9eff; text-decoration: none;">${data.siteUrl}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;">头像链接</td>
                <td style="padding: 10px 0;">
                  <a href="${data.avatarUrl}" style="color: #4a9eff; text-decoration: none;">${data.avatarUrl}</a>
                </td>
              </tr>
            </table>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 20px; text-align: center;">
            此邮件由友链申请表单自动发送
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: '友链申请已发送成功！' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('发送邮件失败:', error);
    return new Response(
      JSON.stringify({ success: false, message: '发送失败，请稍后重试' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
