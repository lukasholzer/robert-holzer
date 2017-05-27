FROM node:7.9-alpine

MAINTAINER Lukas Holzer <office@lukasholzer.com>

ENV HOME_DIR /opt/hmrserver
ENV NODE_ENV development
ENV THEME_FOLDER theme
ENV PORT 4000
ENV BROWSERSYNC 3000

# install node_modules
COPY package.json /tmp/package.json
RUN cd /tmp && yarn
RUN mkdir -p $HOME_DIR && cp -a /tmp/node_modules $HOME_DIR/


WORKDIR $HOME_DIR
COPY $THEME_FOLDER $HOME_DIR/theme/
# COPY $THEME_FOLDER/src $HOME_DIR/src/
COPY config $HOME_DIR/config
COPY package.json $HOME_DIR/
COPY .stylelintrc $HOME_DIR/
COPY tslint.json $HOME_DIR/
COPY composer.json $HOME_DIR/

EXPOSE $PORT
EXPOSE $BROWSERSYNC

# CMD yarn run build

CMD yarn run start
