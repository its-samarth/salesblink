
# Salesblink Email Scheduler API

This backend API schedules emails using Agenda and sends them using NodeMailer.

## API Endpoint

### `POST /api/schedule-email`
Schedule an email to be sent after a specified delay.

**Live URL**: [https://salesblink-five.vercel.app/api/schedule-email](https://salesblink-five.vercel.app/api/schedule-email)

#### Request Body
```json
{
  "to": "samarthkasma21@gmail.com",
  "subject": "Vercel Email",
  "body": "This is an email from Vercel.",
  "when": "in 10 seconds"
}

```

- `to`: Recipient email address.
- `subject`: Subject of the email.
- `body`: Body content of the email.
- `when`: Time when the email should be sent (e.g., `"in 10 seconds"`, `"in 1 hour"`, `"at 5pm"`).

#### Response
- **`200 OK`**: Email scheduled successfully.
- **`400 Bad Request`**: Invalid parameters.

## Installation

Clone the repository and install the dependencies.

```bash
git clone https://github.com/your-username/salesblink-email-scheduler.git
cd salesblink-email-scheduler
npm install
```

## Scripts

- **`start`**: Run the application in production mode.
  ```bash
  npm start
  ```
- **`dev`**: Run the application in development mode with live-reloading.
  ```bash
  npm run dev
  ```
- **`build`**: Compile TypeScript code to JavaScript.
  ```bash
  npm run build
  ```
- **`lint`**: Lint the project code using ESLint.
  ```bash
  npm run lint
  ```
- **`test`**: Run tests with Jest.
  ```bash
  npm run test
  ```
- **`prettify`**: Format the code using Prettier.
  ```bash
  npm run prettify
  ```

## Environment Variables

Make sure to set the following environment variables before running the project:

- **`MAIL_HOST`**: SMTP server host (e.g., `smtp.mailtrap.io`).
- **`MAIL_PORT`**: SMTP server port (e.g., `587`).
- **`MAIL_USER`**: SMTP username.
- **`MAIL_PASS`**: SMTP password.
- **`MAIL_FROM`**: The sender email address.

Example `.env` file:
```bash
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=587
MAIL_USER=your_mail_user
MAIL_PASS=your_mail_pass
MAIL_FROM=your_email@example.com
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

This is the full README in markdown style. You can copy-paste it directly into your GitHub project. Let me know if you need any more adjustments!
