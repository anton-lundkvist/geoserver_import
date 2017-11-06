FROM python:alpine3.6

RUN pip install flask flask-uploads pyjwt flask-cors gunicorn

#ENTRYPOINT [ "python", "/flask_gs_import/run_server.py" ]
#CMD [ "python", "gunicorn -w 4 -b 0.0.0.0:9000 /flask_gs_import/gs_import:app" ]
WORKDIR '/flask_gs_import'
#ENTRYPOINT [ "/usr/local/bin/gunicorn","gunicorn -w 4 -b 0.0.0.0:9000 run_server:app"]
CMD ["/usr/local/bin/gunicorn", "--config", "gunicorn.conf.py", "gs_import:app"]