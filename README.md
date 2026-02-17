# Portfolio - Jash Patel

A modern, responsive portfolio website showcasing my experience, skills, and projects.

## 🚀 Live Site

Once configured, your portfolio will be available at: `https://jashp007.github.io/Portfolio-Jash-Patel/`

## 📦 Setup GitHub Pages

To host this portfolio on GitHub Pages, follow these steps:

### 1. Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub: `https://github.com/jashp007/Portfolio-Jash-Patel`
2. Click on **Settings** (top menu)
3. In the left sidebar, click **Pages** (under "Code and automation")
4. Under **Source**, select **GitHub Actions**
5. Save the changes

### 2. Deploy Your Site

Once you've enabled GitHub Pages with GitHub Actions as the source:

- **Option 1: Automatic Deployment**
  - Merge this PR to the `main` branch
  - The workflow will automatically run and deploy your site
  
- **Option 2: Manual Deployment**
  - Go to the **Actions** tab in your repository
  - Click on "Deploy to GitHub Pages" workflow
  - Click **Run workflow** button
  - Select the branch you want to deploy
  - Click **Run workflow**

### 3. Access Your Site

After the workflow completes successfully:
- Your site will be live at: `https://jashp007.github.io/Portfolio-Jash-Patel/`
- You can find the URL in the workflow run or in the Pages settings

## 🛠️ How It Works

The deployment is automated using GitHub Actions:
- Workflow file: `.github/workflows/deploy.yml`
- Triggers: Pushes to `main` branch or manual trigger
- Process: Checks out code → Sets up Pages → Uploads files → Deploys

## 📝 Making Updates

To update your portfolio:
1. Make changes to `index.html`, `styles.css`, or `script.js`
2. Commit and push to the `main` branch
3. GitHub Actions will automatically rebuild and redeploy your site

## 📄 Files

- `index.html` - Main portfolio page
- `styles.css` - Styling for the portfolio
- `script.js` - Interactive JavaScript functionality
- `.github/workflows/deploy.yml` - GitHub Pages deployment configuration

## 🔒 Permissions

The workflow requires the following permissions (already configured):
- `contents: read` - To read the repository files
- `pages: write` - To deploy to GitHub Pages
- `id-token: write` - For secure deployment

## 💡 Troubleshooting

If your site doesn't deploy:
1. Check the **Actions** tab for error messages
2. Ensure GitHub Pages is enabled with "GitHub Actions" as the source
3. Verify the workflow has the necessary permissions
4. Make sure you've pushed to the `main` branch

## 📧 Contact

- Email: pjash055@gmail.com
- LinkedIn: [jash--patel](https://www.linkedin.com/in/jash--patel)
- GitHub: [jashp007](https://github.com/jashp007)
