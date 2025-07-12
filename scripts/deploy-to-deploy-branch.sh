set -e

BRANCH_DEPLOY="deploy"
DIST_FOLDER="dist"
TEMP_DIR=".tmp-deploy"

echo "📦 [1/5] Build project..."
npm ci
npm run build

echo "🚚 [2/5] Clone deploy branch..."
rm -rf $TEMP_DIR
git clone --branch $BRANCH_DEPLOY --single-branch . $TEMP_DIR

echo "🧹 [3/5] Clear old files from deploy branch..."
rm -rf $TEMP_DIR/*

echo "📂 [4/5] Copy dist to deploy branch..."
cp -r $DIST_FOLDER/* $TEMP_DIR/

cd $TEMP_DIR

echo "🚀 [5/5] Commit & Push"
git config user.name "CI Bot"
git config user.email "ci@local"
git add .
git commit -m "deploy: from $(git rev-parse --abbrev-ref HEAD) on $(date '+%Y-%m-%d %H:%M:%S')" || echo "Nothing to commit"
git push origin $BRANCH_DEPLOY

cd ..
rm -rf $TEMP_DIR
echo "✅ Deploy completed!"
