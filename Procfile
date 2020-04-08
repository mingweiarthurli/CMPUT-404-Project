release: chmod u+x release.sh && ./release.sh
web: gunicorn --pythonpath api config.wsgi --log-file -
web: node frontend/src/index.js