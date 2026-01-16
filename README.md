<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/18HuVPkzyrBJTuUTXRa6aeU8j_HB95LqO

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key (create the file if it doesn't exist)
3. Run the app:
   ```bash
   npm run dev
   ```

## Deploy to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Initial Setup

1. **Create a GitHub repository** (if you haven't already):
   - Go to [GitHub](https://github.com/new)
   - Create a new repository (you can name it anything, e.g., `portfolio` or keep the current name)

2. **Enable GitHub Pages**:
   - Go to your repository → **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

3. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

4. **Automatic Deployment**:
   - The GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
     - Build your project when you push to `main` or `master` branch
     - Deploy it to GitHub Pages
   - You can monitor the deployment in the **Actions** tab of your repository
   - Once deployed, your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Manual Build for GitHub Pages

If you need to build locally with the correct base path:

```bash
# For project pages (deployed at /repo-name/)
BASE_URL=/YOUR_REPO_NAME/ npm run build

# For user/organization pages (deployed at root)
BASE_URL=/ npm run build
```

### Important Notes

- The workflow automatically sets the correct base path using your repository name
- Make sure your `.env.local` file is in `.gitignore` (it should be) to avoid committing sensitive API keys
- If you need to use environment variables in production, set them as GitHub Secrets:
  - Go to **Settings** → **Secrets and variables** → **Actions**
  - Add your `GEMINI_API_KEY` as a secret (if needed for production)

### Project Structure

This project doesn't use a `src` folder - all files are at the root level. This is a valid Vite configuration and works perfectly for deployment.
