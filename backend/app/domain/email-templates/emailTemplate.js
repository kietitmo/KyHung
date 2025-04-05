import env from '../../config/env.js';

class EmailTemplate {
	constructor() {
		this.baseTemplate = `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Email Template</title>
				<style>
					/* Reset styles */
					body, p, h1, h2, h3, h4, h5, h6 {
						margin: 0;
						padding: 0;
						font-family: 'Helvetica Neue', Arial, sans-serif;
					}
					
					/* Base styles */
					body {
						background-color: #f4f4f4;
						margin: 0;
						padding: 0;
						-webkit-font-smoothing: antialiased;
						-moz-osx-font-smoothing: grayscale;
					}
					
					/* Container */
					.container {
						max-width: 600px;
						margin: 0 auto;
						padding: 20px;
						background-color: #ffffff;
					}
					
					/* Header */
					.header {
						text-align: center;
						padding: 20px 0;
						background-color: #ffffff;
					}
					
					.logo {
						max-width: 150px;
						height: auto;
					}
					
					/* Content */
					.content {
						padding: 30px 20px;
						background-color: #ffffff;
					}
					
					.title {
						color: #333333;
						font-size: 24px;
						font-weight: 600;
						margin-bottom: 20px;
						text-align: center;
					}
					
					.text {
						color: #666666;
						font-size: 16px;
						line-height: 1.6;
						margin-bottom: 20px;
					}
					
					/* Button */
					.button {
						display: inline-block;
						padding: 12px 24px;
						background-color: #4CAF50;
						color: #ffffff;
						text-decoration: none;
						border-radius: 4px;
						font-weight: 600;
						margin: 20px 0;
						text-align: center;
					}
					
					/* Footer */
					.footer {
						text-align: center;
						padding: 20px;
						background-color: #f8f8f8;
						border-top: 1px solid #eeeeee;
					}
					
					.social-links {
						margin-bottom: 20px;
					}
					
					.social-links a {
						display: inline-block;
						margin: 0 10px;
						color: #666666;
						text-decoration: none;
					}
					
					.footer-text {
						color: #999999;
						font-size: 14px;
						line-height: 1.4;
					}
					
					/* Responsive */
					@media only screen and (max-width: 600px) {
						.container {
							width: 100% !important;
							padding: 10px !important;
						}
						
						.content {
							padding: 20px 15px !important;
						}
						
						.title {
							font-size: 20px !important;
						}
						
						.text {
							font-size: 14px !important;
						}
					}
				</style>
			</head>
			<body>
				<div class="container">
					<div class="header">
						<img src="${env.EMAIL_LOGO_URL || 'https://marketingai.mediacdn.vn/thumb_w/480//wp-content/uploads/2018/06/Sb-min-2-370x370.jpg'}" alt="Company Logo" class="logo">
					</div>
					<div class="content">
						[CONTENT]
					</div>
					<div class="footer">
						<div class="social-links">
							<a href="${env.EMAIL_FACEBOOK_URL || '#'}">Facebook</a>
							<a href="${env.EMAIL_TWITTER_URL || '#'}">Twitter</a>
							<a href="${env.EMAIL_LINKEDIN_URL || '#'}">LinkedIn</a>
						</div>
						<div class="footer-text">
							<p>© ${new Date().getFullYear()} ${env.EMAIL_COMPANY_NAME || 'Your Company Name'}. All rights reserved.</p>
							<p>${env.EMAIL_COMPANY_ADDRESS || '123 Business Street, City, Country'}</p>
						</div>
					</div>
				</div>
			</body>
			</html>
		`;
	}

	generate(content) {
		return this.baseTemplate.replace('[CONTENT]', content);
	}
}

export default EmailTemplate;
