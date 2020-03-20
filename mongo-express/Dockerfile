FROM node:8

# grab tini for signal processing and zombie killing
# RUN TINI_VERSION="v0.13.2" && \
#     TINI_REAL_VERSION="0.13.2" && \
#     TINI_BUILD="/tmp/tini" && \
#     echo "Installing build dependencies" && \
#     TINI_DEPS="build-essential cmake git rpm curl libcap-dev python-dev" && \
# apt-get update && \
# apt-get install --yes ${TINI_DEPS} && \
#     echo "Building Tini" && \
#     git clone https://github.com/krallin/tini.git "${TINI_BUILD}"
# RUN TINI_VERSION="v0.13.2" && \
#     TINI_REAL_VERSION="0.13.2" && \
#     TINI_BUILD="/tmp/tini" && \
# 	cd "${TINI_BUILD}" && \
# curl -O https://files.pythonhosted.org/packages/37/db/89d6b043b22052109da35416abc3c397655e4bd3cff031446ba02b9654fa/virtualenv-16.4.3.tar.gz && \
# tar -xf virtualenv-16.4.3.tar.gz && \
# mv virtualenv-16.4.3/virtualenv.py virtualenv-16.4.3/virtualenv && \
# export PATH="${TINI_BUILD}/virtualenv-16.4.3:${PATH}" && \
# HARDENING_CHECK_PLACEHOLDER="${TINI_BUILD}/hardening-check/hardening-check" && \
# HARDENING_CHECK_PLACEHOLDER_DIR="$(dirname "${HARDENING_CHECK_PLACEHOLDER}")" && \
# mkdir "${HARDENING_CHECK_PLACEHOLDER_DIR}" && \
# echo  "#/bin/sh" > "${HARDENING_CHECK_PLACEHOLDER}" && \
# chmod +x "${HARDENING_CHECK_PLACEHOLDER}" && \
# export PATH="${PATH}:${HARDENING_CHECK_PLACEHOLDER_DIR}" && \
# git checkout "${TINI_VERSION}" && \
# export SOURCE_DIR="${TINI_BUILD}" && \
# export BUILD_DIR="${TINI_BUILD}" && \
# export ARCH_NATIVE=1 && \
# "${TINI_BUILD}/ci/run_build.sh" && \
#     echo "Installing Tini" && \
#     dpkg -i "${TINI_BUILD}/tini_${TINI_REAL_VERSION}.deb"  && \
#     echo "Cleaning up" && \
#     cd / && \
# rm -rf "${TINI_BUILD}" && \
#     apt-get purge --yes ${TINI_DEPS} && \
# apt-get autoremove --yes && \
# rm -rf /var/lib/apt/lists/* && \
#     echo "Symlinkng to /usr/local/bin" && \
#     ln -s /usr/bin/tini        /usr/local/bin/tini && \
#     ln -s /usr/bin/tini-static /usr/local/bin/tini-static && \
#     echo "Running Smoke Test" && \
#     /usr/bin/tini -- ls && \
#     /usr/bin/tini-static -- ls && \
#     /usr/local/bin/tini -- ls && \
#     /usr/local/bin/tini-static -- ls && \
#     echo "Done"

EXPOSE 8081

# override some config defaults with values that will work better for docker
ENV ME_CONFIG_EDITORTHEME="default" \
    ME_CONFIG_MONGODB_SERVER="mongo" \
    ME_CONFIG_MONGODB_ENABLE_ADMIN="true" \
    ME_CONFIG_BASICAUTH_USERNAME="" \
    ME_CONFIG_BASICAUTH_PASSWORD="" \
    ME_CONFIG_BASICAUTH_USERNAME_FILE="" \
    ME_CONFIG_BASICAUTH_PASSWORD_FILE="" \
    ME_CONFIG_MONGODB_ADMINUSERNAME_FILE="" \
    ME_CONFIG_MONGODB_ADMINPASSWORD_FILE="" \
    ME_CONFIG_MONGODB_AUTH_USERNAME_FILE="" \
    ME_CONFIG_MONGODB_AUTH_PASSWORD_FILE="" \
    VCAP_APP_HOST="0.0.0.0"

WORKDIR /app

COPY . /app

RUN cp config.default.js config.js

RUN set -x \
	&& apt-get update && apt-get install -y git --no-install-recommends \
	&& npm install \
	&& apt-get purge --auto-remove -y git \
	&& rm -rf /var/lib/apt/lists/*

RUN npm run build

CMD ["npm", "start"]
