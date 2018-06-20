#!/bin/bash

DEV=/var/www/dev.freestreetmap
PYCROCOSM=/var/pycrocosm

BROWSE=browse
USER=contributor
FRONTPAGE=frontpage

PYC_DIR=pycrocosm
PYC_SET=settings.py
PYC_URL=urls.py

PGMAP_DIR=pgmap
PGMAP_CFG=config.cfg

DATE=`date +%Y%m%d%H%M%S`


cd ${PYCROCOSM}

echo "updating browse"

if [ -d "$BROWSE" ]; then
  if [ -L "$BROWSE" ]; then
    # It is a symlink!
    # Symbolic link specific commands go here.
    rm "$BROWSE"
    ln -s ${DEV}/${BROWSE} .
  else
    # It's a directory!
    # Directory command goes here.
    mv ${BROWSE} ${BROWSE}.${DATE}
    ln -s ${DEV}/${BROWSE} .
  fi
else
  ln -s ${DEV}/${BROWSE} .
fi

echo "updating user"

if [ -d "$USER" ]; then
  if [ -L "$USER" ]; then
    # It is a symlink!
    # Symbolic link specific commands go here.
    rm "$USER"
    ln -s ${DEV}/${USER} .
  else
    # It's a directory!
    # Directory command goes here.
    mv ${USER} ${USER}.${DATE}
    ln -s ${DEV}/${USER} .
  fi
else
  ln -s ${DEV}/${USER} .
fi

echo "updating frontpage"

if [ -d "$FRONTPAGE" ]; then
  if [ -L "$FRONTPAGE" ]; then
    # It is a symlink!
    # Symbolic link specific commands go here.
    rm "$FRONTPAGE"
    ln -s ${DEV}/${FRONTPAGE} .
  else
    # It's a directory!
    # Directory command goes here.
    mv ${FRONTPAGE} ${FRONTPAGE}.${DATE}
    ln -s ${DEV}/${FRONTPAGE} .
  fi
fi

echo "updating pycrocosm settings.py"

if [ -f "$PYC_DIR/$PYC_SET" ]; then
  if [ -L "$PYC_DIR/$PYC_SET" ]; then
    # It is a symlink!
    rm "$PYC_DIR/$PYC_SET"
    ln -s ${DEV}/${PYC_DIR}/${PYC_SET} ${PYCROCOSM}/${PYC_DIR}
  else
    # It's regular file!
    mv ${PYC_DIR}/${PYC_SET} ${PYC_DIR}/${PYC_SET}.${DATE}
    ln -s ${DEV}/${PYC_DIR}/${PYC_SET} ${PYCROCOSM}/${PYC_DIR}
  fi
else
  ln -s ${DEV}/${PYC_DIR}/${PYC_SET} ${PYCROCOSM}/${PYC_DIR}
fi

echo "updating pycrocosm url.py"

if [ -f "$PYC_DIR/$PYC_URL" ]; then
  if [ -L "$PYC_DIR/$PYC_URL" ]; then
    # It is a symlink!
    rm "$PYC_DIR/$PYC_URL"
    ln -s ${DEV}/${PYC_DIR}/${PYC_URL} ${PYCROCOSM}/${PYC_DIR}
  else
    # It's regular file!
    mv ${PYC_DIR}/${PYC_URL} ${PYC_DIR}/${PYC_URL}.${DATE}
    ln -s ${DEV}/${PYC_DIR}/${PYC_URL} ${PYCROCOSM}/${PYC_DIR}
  fi
fi

echo "updating pgmap config.cfg"

if [ -f "$PGMAP_DIR/$PGMAP_CFG" ]; then
  if [ -L "$PGMAP_DIR/$PGMAP_CFG" ]; then
    # It is a symlink!
    rm "$PGMAP_DIR/$PGMAP_CFG"
    ln -s ${DEV}/${PGMAP_DIR}/${PGMAP_CFG} ${PYCROCOSM}/${PGMAP_DIR}
  else
    # It's regular file!
    mv ${PGMAP_DIR}/${PGMAP_CFG} ${PGMAP_DIR}/${PGMAP_CFG}.${DATE}
    ln -s ${DEV}/${PGMAP_DIR}/${PGMAP_CFG} ${PYCROCOSM}/${PGMAP_DIR}
  fi
fi


python manage.py collectstatic


echo "updating static favicon.ico and robots.txt"

cp ${DEV}/static/favicon.ico ${PYCROCOSM}/static
cp ${DEV}/static/robots.txt ${PYCROCOSM}/static

#if [ -f "$PGMAP_DIR/$PGMAP_CFG" ]; then
#  if [ -L "$PGMAP_DIR/$PGMAP_CFG" ]; then
#    # It is a symlink!
#    rm "$PGMAP_DIR/$PGMAP_CFG"
#    ln -s ${DEV}/${PGMAP_DIR}/${PGMAP_CFG} ${PYCROCOSM}/${PGMAP_DIR}
#  else
#    # It's regular file!
#    mv ${PGMAP_DIR}/${PGMAP_CFG} ${PGMAP_DIR}/${PGMAP_CFG}.${DATE}
#    ln -s ${DEV}/${PGMAP_DIR}/${PGMAP_CFG} ${PYCROCOSM}/${PGMAP_DIR}
#  fi
#fi



service pycrocosm restart
service nginx restart

echo chown -R www-data:www-data ${PYCROCOSM}/
