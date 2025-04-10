class PasswordResetConfirmationTemplate {
	generate(data) {
		const { user } = data;
		
		return `
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="utf-8">
				<title>Password Reset Successful</title>
				<style>
					body {
						font-family: Arial, sans-serif;
						line-height: 1.6;
						color: #333;
						max-width: 600px;
						margin: 0 auto;
						padding: 20px;
					}
					.header {
						background-color: #4CAF50;
						color: white;
						padding: 20px;
						text-align: center;
						border-radius: 5px 5px 0 0;
					}
					.content {
						padding: 20px;
						background-color: #f9f9f9;
						border: 1px solid #ddd;
						border-radius: 0 0 5px 5px;
					}
					.footer {
						text-align: center;
						margin-top: 20px;
						font-size: 12px;
						color: #777;
					}
					.button {
						display: inline-block;
						background-color: #4CAF50;
						color: white;
						padding: 10px 20px;
						text-decoration: none;
						border-radius: 5px;
						margin: 20px 0;
					}
				</style>
			</head>
			<body>
				<div class="header">
					<h1>Password Reset Successful</h1>
				</div>
				<div class="content">
					<p>Hello ${user.fullName || 'User'},</p>
					
					<p>Your password has been successfully reset. If you did not make this change, please contact our support team immediately.</p>
					
					<p>For security reasons, we recommend:</p>
					<ul>
						<li>Using a strong, unique password</li>
						<li>Not sharing your password with anyone</li>
						<li>Changing your password regularly</li>
					</ul>
					
					<p>If you have any questions or concerns, please don't hesitate to contact our support team.</p>
					
					<p>Thank you for using our service!</p>
				</div>
				<div class="footer">
					<p>This is an automated message, please do not reply to this email.</p>
					<p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
				</div>
			</body>
			</html>
		`;
	}
}

export default PasswordResetConfirmationTemplate; 