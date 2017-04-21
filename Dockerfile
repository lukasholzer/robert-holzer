FROM node:7.9-alpine

MAINTAINER Lukas Holzer <office@lukasholzer.com>

ENV HOME_DIR /opt/hmrserver
ENV NODE_ENV development
ENV THEME_FOLDER theme
ENV PORT 4000


COPY package.json /tmp/package.json
RUN cd /tmp && yarn
RUN mkdir -p $HOME_DIR && cp -a /tmp/node_modules $HOME_DIR/

WORKDIR $HOME_DIR
COPY $THEME_FOLDER/src $HOME_DIR/src/
COPY config $HOME_DIR/config
COPY package.json $HOME_DIR/
COPY webpack.middleware.js $HOME_DIR/

EXPOSE $PORT

CMD yarn start
