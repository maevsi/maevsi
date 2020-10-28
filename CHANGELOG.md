# [0.9.0](https://github.com/maevsi/maevsi/compare/0.8.0...0.9.0) (2020-10-28)


### Features

* **og-meta:** add open graph meta tags ([db00824](https://github.com/maevsi/maevsi/commit/db008243319a73edbf48572f0973150ba461b24e)), closes [#69](https://github.com/maevsi/maevsi/issues/69)
* **og-meta:** og meta for events ([1c2f715](https://github.com/maevsi/maevsi/commit/1c2f715a802fbea5cd90c9b0d351272c329e3ddc))

# [0.8.0](https://github.com/maevsi/maevsi/compare/0.7.0...0.8.0) (2020-10-28)


### Bug Fixes

* **redeem:** add missing translation ([1a2eb8e](https://github.com/maevsi/maevsi/commit/1a2eb8e4a631b6151a614c0bad14e8b3e360489b))


### Features

* **robots:** add dependency ([7343d62](https://github.com/maevsi/maevsi/commit/7343d622818b953b02438b44a91957e70479a03c))
* **robots:** extract constants reg. URL ([b6e9538](https://github.com/maevsi/maevsi/commit/b6e9538e0f18267648f6b1bcc04d2b40b786c430))
* **robots:** setup @nuxtjs/robots ([868e26c](https://github.com/maevsi/maevsi/commit/868e26cd5534548b5bbe05bdd1aac43fb87fcbfb))

# [0.7.0](https://github.com/maevsi/maevsi/compare/0.6.0...0.7.0) (2020-10-25)


### Bug Fixes

* **new:** redirect users who aren't signed in ([e3d2319](https://github.com/maevsi/maevsi/commit/e3d231928df1ef9ed2f3e6b324e5eabc7b914182))


### Features

* **event-list:** show user's events on event path ([273edad](https://github.com/maevsi/maevsi/commit/273edadc742c16d156e52ea8f06c36bcdf3ac6e3))
* **i18n:** add German translation ([1974e32](https://github.com/maevsi/maevsi/commit/1974e3229875d7f7d8a457e7e27c6539095b9674))
* **i18n:** add proof of concept ([835b41e](https://github.com/maevsi/maevsi/commit/835b41e48a41624a1fd014644cc83b1a78c12a49))

# [0.6.0](https://github.com/maevsi/maevsi/compare/0.5.0...0.6.0) (2020-10-25)


### Bug Fixes

* **ical:** allow empty descriptions ([a2cb013](https://github.com/maevsi/maevsi/commit/a2cb013f32e5bfc40391f2ee38f3eefa11d51871))
* **sqitch/authenticate:** add missing parameter ([615bd97](https://github.com/maevsi/maevsi/commit/615bd97161f14e6b904cc8d46121af9ff78baae6))


### Features

* **cookie:** set expiry to 31 days ([d6bf2af](https://github.com/maevsi/maevsi/commit/d6bf2afd6afb2a5f37347e1f5ffc90c00b569d7d))
* **event:** alert on unexpected ical status code ([cd93c2c](https://github.com/maevsi/maevsi/commit/cd93c2c1b00a0301174a742bcb0094bdc8889d46))

# [0.5.0](https://github.com/maevsi/maevsi/compare/0.4.7...0.5.0) (2020-10-24)


### Features

* redirect to event on creation ([a82eaa7](https://github.com/maevsi/maevsi/commit/a82eaa7dfe374d6732d523348240b87cdb52bec4))

## [0.4.7](https://github.com/maevsi/maevsi/compare/0.4.6...0.4.7) (2020-10-24)


### Bug Fixes

* **apollo:** correct token name for "getAuth" ([758d5f4](https://github.com/maevsi/maevsi/commit/758d5f4980f517de0f22138dc0b609e6a879922a))
* **auth:** use token's own expiry ([1c5db1d](https://github.com/maevsi/maevsi/commit/1c5db1d94d275095f3721528deaa1d438235c8de))
* **global:** remove "this." prefix ([638efe8](https://github.com/maevsi/maevsi/commit/638efe80d74970a1468eb5495ce34d010c6fa3f8))
* **sqitch:** correct paths ([40b4ebe](https://github.com/maevsi/maevsi/commit/40b4ebe0a8b9f13330df6e9ef628208f7532139d))

## [0.4.6](https://github.com/maevsi/maevsi/compare/0.4.5...0.4.6) (2020-10-22)


### Bug Fixes

* **event-new:** convert maximum invitee count to number ([9c71e66](https://github.com/maevsi/maevsi/commit/9c71e660d92185f1fb3f21d146372103ac0241f7))


### Performance Improvements

* **docker:** increase healthcheck interval ([85a68d2](https://github.com/maevsi/maevsi/commit/85a68d266844d11c54b268cbe3fdac43d0312ce4))

## [0.4.5](https://github.com/maevsi/maevsi/compare/0.4.4...0.4.5) (2020-10-22)


### Bug Fixes

* add healthcheck endpoint ([39dff08](https://github.com/maevsi/maevsi/commit/39dff08a7adb60f35567b3a6cdbb4392d0c7aa4c))

## [0.4.4](https://github.com/maevsi/maevsi/compare/0.4.3...0.4.4) (2020-10-22)


### Bug Fixes

* **docker:** install missing dependency ([b8c77f0](https://github.com/maevsi/maevsi/commit/b8c77f036f9cdd8a35ae2c881c8123f7a955f659))

## [0.4.3](https://github.com/maevsi/maevsi/compare/0.4.2...0.4.3) (2020-10-22)


### Performance Improvements

* **docker:** add health check ([6730d16](https://github.com/maevsi/maevsi/commit/6730d16bf751a0c634fbbcb0bbd9859cb87e0375))
* **docker:** optimize installation ([e312ee0](https://github.com/maevsi/maevsi/commit/e312ee0624fd1133ec7b1730d50e5cb78300b4f2))

## [0.4.2](https://github.com/maevsi/maevsi/compare/0.4.1...0.4.2) (2020-10-21)


### Bug Fixes

* **nuxt:** correct environment variable name ([1e79ce6](https://github.com/maevsi/maevsi/commit/1e79ce6ea31abc63a3be0405d2f8001e9b540ec2))

## [0.4.1](https://github.com/maevsi/maevsi/compare/0.4.0...0.4.1) (2020-10-21)


### Bug Fixes

* **csp:** implement specific policies ([246b0c9](https://github.com/maevsi/maevsi/commit/246b0c9ca270b6ff73802cc50a730eafb8d9aba7))

# [0.4.0](https://github.com/maevsi/maevsi/compare/0.3.2...0.4.0) (2020-10-21)


### Bug Fixes

* **auth:** move redirects to callback ([ef1b5a7](https://github.com/maevsi/maevsi/commit/ef1b5a7d1a27c22c1ca69da6a5b0bf2c174fb854))


### Features

* **auth:** add "__Secure-" cookie prefix ([4653d43](https://github.com/maevsi/maevsi/commit/4653d43ace71f53f5602ef61bc430ccea47c9714))
* **nuxt:** enable csp ([641385d](https://github.com/maevsi/maevsi/commit/641385dfc6a6507a57bc6d162e920a7076b27dcf))
* **yarn:** add nuxt-helmet ([0eebae2](https://github.com/maevsi/maevsi/commit/0eebae2362fe84350fb59a2f0f44005e61fabcf5))

## [0.3.2](https://github.com/maevsi/maevsi/compare/0.3.1...0.3.2) (2020-10-21)


### Bug Fixes

* **yarn:** add @fortawesome/vue-fontawesome ([15cc1d4](https://github.com/maevsi/maevsi/commit/15cc1d4b40e36aae38c621a48eb6c9ce8c9ba7e5))

## [0.3.1](https://github.com/maevsi/maevsi/compare/0.3.0...0.3.1) (2020-10-21)


### Bug Fixes

* **yarn:** add @fortawesome/fontawesome-svg-core ([90d368c](https://github.com/maevsi/maevsi/commit/90d368c56e07fedf14597e80e74f04e4d6de8adf))

# [0.3.0](https://github.com/maevsi/maevsi/compare/0.2.2...0.3.0) (2020-10-21)


### Features

* add sitemap ([760f273](https://github.com/maevsi/maevsi/commit/760f273c5e7f3322fd9ccc460e473482a9216b0e))

## [0.2.2](https://github.com/maevsi/maevsi/compare/0.2.1...0.2.2) (2020-10-20)


### Bug Fixes

* **ci:** correct extraction path ([e1bfc45](https://github.com/maevsi/maevsi/commit/e1bfc451fee18686d4f028f0b87a6f36643245d9))

## [0.2.1](https://github.com/maevsi/maevsi/compare/0.2.0...0.2.1) (2020-10-20)


### Bug Fixes

* **deps:** bump crazy-max/ghaction-docker-buildx from v3.3.0 to v3.3.1 ([d477769](https://github.com/maevsi/maevsi/commit/d477769ccc479e88c91e357384edf77d6136d5f5))
* **deps:** bump stefanzweifel/git-auto-commit-action ([08893f8](https://github.com/maevsi/maevsi/commit/08893f84e94bbeace01dd2181270afc7ba55f963))
* **deps:** bump WyriHaximus/github-action-next-semvers from v1.0 to v1 ([c402bde](https://github.com/maevsi/maevsi/commit/c402bde33550f19a730d1af2a8f7b528a764aa5b))

# [0.2.0](https://github.com/maevsi/maevsi/compare/0.1.11...0.2.0) (2020-10-20)


### Bug Fixes

* **a:** add rel="noopener" to target="_blank" ([b64774d](https://github.com/maevsi/maevsi/commit/b64774d7ef843cc864cbcc1f0ec7623367e904ea))
* **api:** migrate to node's http api ([259d993](https://github.com/maevsi/maevsi/commit/259d9930614fde2cb45a86a1e50d80dec9b3973d))
* **apollo:** add return to auth ([a1ad6f8](https://github.com/maevsi/maevsi/commit/a1ad6f81098fc8958db311ad58256ad4c871d5ed))
* **apollo:** downgrade @nuxtjs/apollo to 4.0.1-rc.1 ([562bf34](https://github.com/maevsi/maevsi/commit/562bf348825da59f8507e637c83fc8df1bd3f8b9))
* **apollo:** handle empty responses ([738faea](https://github.com/maevsi/maevsi/commit/738faea7cc021385d0af6cae1f34b8017d3c8013))
* **apollo:** move ".loading" to appropriate components ([3768967](https://github.com/maevsi/maevsi/commit/3768967f2f5153ba0cc265daa874cd0d9f150bfa))
* **apollo:** refactor jwt name, remove null checks in then ([92539b6](https://github.com/maevsi/maevsi/commit/92539b61ee0b118197467132c8eac2efde17c533))
* **docker:** change node versions to support "node-zopfli-es" dependency ([8904349](https://github.com/maevsi/maevsi/commit/8904349f87964adcb3c6a949febb34d203ac6799))
* **docker:** correct entrypoint and command for nuxt ([babc444](https://github.com/maevsi/maevsi/commit/babc444382c911f9902cde4522ac7a453c566927))
* **event:** set proper label id ([504cb9f](https://github.com/maevsi/maevsi/commit/504cb9f4d444dd91054df5b6399dd78c6f5bca4f))
* **index:** correct title ([9c84760](https://github.com/maevsi/maevsi/commit/9c84760a0e9d143b30ef2a6516b90148c9981270))
* **logo:** move from javascript to css loading ([df9b533](https://github.com/maevsi/maevsi/commit/df9b533321752f0061e9f56a3f15b8f95da4141b))
* **mixins:** add global plugin ([70e42cd](https://github.com/maevsi/maevsi/commit/70e42cd889cbab19dba3cc448ada4280f4d43554))
* **new:** correct component name ([86ad8f4](https://github.com/maevsi/maevsi/commit/86ad8f479b6b0846cbbd0249dcce61173c28345f))
* **nuxt:** add missing slugify plugin ([1650cec](https://github.com/maevsi/maevsi/commit/1650cecf803f0ee53795544b51da78fcb47269e0))
* **nuxt:** set cookies to secure & strict same-site ([bf967b2](https://github.com/maevsi/maevsi/commit/bf967b26882a154ac6d867c4746a96f2860511b9))
* **nuxt:** use head instead of metaInfo, correct titles ([328b845](https://github.com/maevsi/maevsi/commit/328b84510fc471704badb1c3b266a9db62240f3f))
* **sign-in/-out:** readd location reloads ([f06c0ef](https://github.com/maevsi/maevsi/commit/f06c0efc685423060c3ac3ad17c81271729e0537))
* **sign-in/register:** differentiate between duplicate ids ([7320bd0](https://github.com/maevsi/maevsi/commit/7320bd088edffc5d8da9f8d181bafcae6bbf56ba))
* **snyk:** add missing script, remove outdated ".snyk" ([510fb4c](https://github.com/maevsi/maevsi/commit/510fb4ccc9bce4a6e50329be6ff4b1ce40cd28f3))
* **tailwind:** opt in to the defaultLineHeights future ([a9e147f](https://github.com/maevsi/maevsi/commit/a9e147f6bc88eb03a864dc7fd722ab6272e7558d))
* **yarn:** add peer dependencies ([2ec3212](https://github.com/maevsi/maevsi/commit/2ec3212ab658d848b7e1623974fd7b6af35a4d0a))
* **yarn:** downgrade webpack ([adbe5cf](https://github.com/maevsi/maevsi/commit/adbe5cf6f0b4d685accd230503a5f125f725ea6a))
* **yarn:** require node-zopfli-es ([4d38216](https://github.com/maevsi/maevsi/commit/4d3821660c39bfbbd028a32e4284c111d5b98511))
* corret moment usage without vue plugin ([49d3270](https://github.com/maevsi/maevsi/commit/49d3270abf50270ad010d72a4ba5882dbf11a28a))
* migrate framework specific tags ([daa48be](https://github.com/maevsi/maevsi/commit/daa48be6723f2024bb1267ddd82dac7ea2cfbe00))
* readd tab index to links ([0122744](https://github.com/maevsi/maevsi/commit/01227445ad4963aad9aa3a9c2bd6cba0e4ec9344))
* remove "gridsome" occurrences ([1fd1318](https://github.com/maevsi/maevsi/commit/1fd1318701a5f279ca44e3af559d974a7fcb7b40))


### Features

* implement httpOnly cookie authentication ([4cd5cb3](https://github.com/maevsi/maevsi/commit/4cd5cb3706dcb62e80fbb807bfccd835c9e3d78d))
* **apollo:** use cookies for jwt ([0a65354](https://github.com/maevsi/maevsi/commit/0a653549ba3ff2fed58659e3d977ef14797d97ab))
* **nuxt:** add brotli compression ([806b204](https://github.com/maevsi/maevsi/commit/806b2046100944d0b326caf2ccfcfbeaec04ca21))
* **nuxt:** add fallback title if no local title is available ([c81a6c9](https://github.com/maevsi/maevsi/commit/c81a6c9b5d3ceba6dc23f0f3c772a3658f86c0b2))


### Performance Improvements

* **docker:** clean up apt after installation ([349cf79](https://github.com/maevsi/maevsi/commit/349cf79754afb8319d19137856c0df255a613590))

## [0.1.11](https://github.com/maevsi/maevsi/compare/0.1.10...0.1.11) (2020-10-19)


### Bug Fixes

* **release:** schedule release ([02d80fd](https://github.com/maevsi/maevsi/commit/02d80fdce7d49b724643d68e53e0bcdbfcb670eb))

## [0.1.10](https://github.com/maevsi/maevsi/compare/0.1.9...0.1.10) (2020-10-05)


### Bug Fixes

* **workflows/schedule:** correct path ([a1ff62a](https://github.com/maevsi/maevsi/commit/a1ff62a44266148ccff3d023fc70f8aebbb3c732))

## [0.1.9](https://github.com/maevsi/maevsi/compare/0.1.8...0.1.9) (2020-10-05)


### Bug Fixes

* **404:** add missing page title ([77f7629](https://github.com/maevsi/maevsi/commit/77f76292c59abeae7835be82aa2ff9b6fb40b346))

## [0.1.8](https://github.com/maevsi/maevsi/compare/0.1.7...0.1.8) (2020-10-05)


### Bug Fixes

* **release:** schedule release ([4fb71b1](https://github.com/maevsi/maevsi/commit/4fb71b1ddaa268d827e3b1fa683e3ab72840c0fb))

## [0.1.7](https://github.com/maevsi/maevsi/compare/0.1.6...0.1.7) (2020-10-05)


### Bug Fixes

* populate data variables in mounted ([50d32f5](https://github.com/maevsi/maevsi/commit/50d32f538b0fea87b1b9bb960f42d2b0e85dea99)), closes [#41](https://github.com/maevsi/maevsi/issues/41)


### Performance Improvements

* **main:** add default value for GRIDSOME_STACK_DOMAIN ([9a942ab](https://github.com/maevsi/maevsi/commit/9a942abee2d01f0ae600e300e7c1cd3018dc0154))

## [0.1.6](https://github.com/maevsi/maevsi/compare/0.1.5...0.1.6) (2020-10-04)


### Bug Fixes

* **ci:** don't start semantic-release on PRs ([00eac9a](https://github.com/maevsi/maevsi/commit/00eac9ad0662342a3bb00f9599c4839a65d972fb))
* **forms:** use events instead of prop mutation ([9ec8262](https://github.com/maevsi/maevsi/commit/9ec8262076b373f2d849d685f3ef6038ae1c6735))
* **tailwind:** whitelist ":disabled" ([5da0470](https://github.com/maevsi/maevsi/commit/5da047081fa7ec4215bde98c08d9618b33e5ed01)), closes [#35](https://github.com/maevsi/maevsi/issues/35)

## [0.1.5](https://github.com/maevsi/maevsi/compare/0.1.4...0.1.5) (2020-10-02)


### Bug Fixes

* **semantic-release:** correct assets ([b74078a](https://github.com/maevsi/maevsi/commit/b74078ad50eb2b77962223679b8c020fecd3185a))

## [0.1.4](https://github.com/maevsi/maevsi/compare/0.1.3...0.1.4) (2020-10-02)


### Bug Fixes

* **workflows/semantic-release:** correct token usage ([0b69980](https://github.com/maevsi/maevsi/commit/0b69980550079396693151330c9b687e3a3372b7))

## [0.1.3](https://github.com/maevsi/maevsi/compare/0.1.2...0.1.3) (2020-10-02)


### Bug Fixes

* **nginx:** add dynamic path locations ([8a0eadd](https://github.com/maevsi/maevsi/commit/8a0eadd0c54de34a6d397545d9ee57742e9dad7b))

## [0.1.2](https://github.com/maevsi/maevsi/compare/0.1.1...0.1.2) (2020-09-29)


### Bug Fixes

* **nginx:** correct redirects ([d252e00](https://github.com/maevsi/maevsi/commit/d252e00a62a5bc9edcb28f299689f5e45f2c708b))

## [0.1.1](https://github.com/maevsi/maevsi/compare/0.1.0...0.1.1) (2020-09-29)


### Bug Fixes

* **tailwind:** correct purge content ([c8a41c4](https://github.com/maevsi/maevsi/commit/c8a41c4797ed4a7a7a2e09da7304257a754e66c2))

# [0.1.0](https://github.com/maevsi/maevsi/compare/0.0.3...0.1.0) (2020-09-28)


### Bug Fixes

* **deps:** pin dependencies ([37781df](https://github.com/maevsi/maevsi/commit/37781dff9d8e2567479f820e37d04be0584a3436))
* **deps:** pin dependency @gridsome/plugin-critical to 0.1.6 ([d296b00](https://github.com/maevsi/maevsi/commit/d296b0039838ef0e916d24dae8277d9952fb1a26))
* **deps:** pin dependency snyk to 1.336.0 ([044788a](https://github.com/maevsi/maevsi/commit/044788a2c8c52142dce30e4ff0562bde8c23ce56))
* **deps:** update dependency @fortawesome/vue-fontawesome to v0.1.10 ([45ad654](https://github.com/maevsi/maevsi/commit/45ad65421c44d6b0655fe1b68b4f4a4b36796501))
* **deps:** update dependency @fortawesome/vue-fontawesome to v2 ([96123e4](https://github.com/maevsi/maevsi/commit/96123e480631571f41fd6459687ba4107520dea1))
* **deps:** update dependency @uppy/core to v1.13.0 ([a786c93](https://github.com/maevsi/maevsi/commit/a786c93330ac151f41bf79559dcc91603051b9aa))
* **deps:** update dependency @uppy/tus to v1.7.1 ([17bf9a0](https://github.com/maevsi/maevsi/commit/17bf9a0f556ec83ffa67ddcd5308e775e124d6dd))
* **deps:** update dependency @uppy/tus to v1.7.4 ([8476a0f](https://github.com/maevsi/maevsi/commit/8476a0f9ab711e2c5d80c907a4651c23fca21be9))
* **deps:** update dependency apollo-boost to v0.4.9 ([b36fc6c](https://github.com/maevsi/maevsi/commit/b36fc6cb2e32e18612b24e006bc47b024916f752))
* **deps:** update dependency graphql to v15 ([52017aa](https://github.com/maevsi/maevsi/commit/52017aaf9843a44c0619bb9603367755569026ca))
* **deps:** update dependency graphql to v15.1.0 ([d126db8](https://github.com/maevsi/maevsi/commit/d126db8912a2d78a72c9304765cc124e6f6b0414))
* **deps:** update dependency graphql to v15.2.0 ([4529b5d](https://github.com/maevsi/maevsi/commit/4529b5d3dca7d73541a3281cc9721c2434f75e96))
* **deps:** update dependency graphql to v15.3.0 ([2a11e85](https://github.com/maevsi/maevsi/commit/2a11e85816efd8762cfac0857fe88f43c5b1787c))
* **deps:** update dependency gridsome to v0.7.17 ([b134b51](https://github.com/maevsi/maevsi/commit/b134b51d90d18ff17b4b07c83a7462062bd0aaf4))
* **deps:** update dependency gridsome to v0.7.18 ([515337d](https://github.com/maevsi/maevsi/commit/515337d204e79f3a015a1f3b990df43fafd3cc91))
* **deps:** update dependency gridsome to v0.7.19 ([41a4017](https://github.com/maevsi/maevsi/commit/41a401727ebb8db2fd9c9f68165b2dd897a05e1a))
* **deps:** update dependency gridsome to v0.7.20 ([3c36e35](https://github.com/maevsi/maevsi/commit/3c36e35349f0fc453f7b6463e392dc78cd091c67))
* **deps:** update dependency gridsome to v0.7.21 ([d720578](https://github.com/maevsi/maevsi/commit/d720578fa91cc4bf4fe752b0ef95e9fc2d142cab))
* **deps:** update dependency ical-generator to v1.11.0 ([ffe499e](https://github.com/maevsi/maevsi/commit/ffe499e476d261ef126a107e94592dda5476b962))
* **deps:** update dependency ical-generator to v1.12.0 ([5cf918e](https://github.com/maevsi/maevsi/commit/5cf918e2cc56a83f05bcb5b5b4bccc3f0afedda7))
* **deps:** update dependency ical-generator to v1.12.1 ([8551163](https://github.com/maevsi/maevsi/commit/855116318d6f265ee1fbc5ce2db78ba9cff28141))
* **deps:** update dependency ical-generator to v1.12.2 ([77ffef7](https://github.com/maevsi/maevsi/commit/77ffef7ac1f3fcc84e0f146478b423b43611e9f6))
* **deps:** update dependency ical-generator to v1.13.0 ([b9e8017](https://github.com/maevsi/maevsi/commit/b9e801724eecb2dbe02f48f672b7e53bb810097c))
* **deps:** update dependency ical-generator to v1.14.0 ([ade290e](https://github.com/maevsi/maevsi/commit/ade290e43cfa6670d17e10f179384256af97e6ed))
* **deps:** update dependency ical-generator to v1.15.0 ([69921d5](https://github.com/maevsi/maevsi/commit/69921d5f890752f80f7543c2de9d8619fb992248))
* **deps:** update dependency pg to v8.2.2 ([eb66910](https://github.com/maevsi/maevsi/commit/eb66910e727c5cdca5f30c069b987a1ed633a5dd))
* **deps:** update dependency pg to v8.3.0 ([4728a62](https://github.com/maevsi/maevsi/commit/4728a621541a5a38222d7b2f0ddc62ee1caec073))
* **deps:** update dependency pg to v8.3.2 ([bb03265](https://github.com/maevsi/maevsi/commit/bb0326537561b8c05fa924f29e893893cdc2ddfc))
* **deps:** update dependency pg to v8.3.3 ([d540154](https://github.com/maevsi/maevsi/commit/d5401545dbb5c0c5c5cbf2853d3f6933071b9ec6))
* **deps:** update dependency slugify to v1.4.2 ([a9a146a](https://github.com/maevsi/maevsi/commit/a9a146a73f6a0c562786fd717f79b3e9ed8d3a4e))
* **deps:** update dependency slugify to v1.4.4 ([aa8fd19](https://github.com/maevsi/maevsi/commit/aa8fd1909f108814091aeab330eac587116fc3bd))
* **deps:** update dependency slugify to v1.4.5 ([23e6208](https://github.com/maevsi/maevsi/commit/23e62085f2071b44c71ef3128a3ee8ddfc004a64))
* **deps:** update dependency snyk to v1.317.0 ([20b7694](https://github.com/maevsi/maevsi/commit/20b7694ef76a5a652b4c853a7e4cd59fdd1ee17d))
* **deps:** update dependency snyk to v1.318.0 ([7ee000e](https://github.com/maevsi/maevsi/commit/7ee000e650488ca3eed49088728e22ddb45f42f1))
* **deps:** update dependency snyk to v1.319.0 ([2bafd52](https://github.com/maevsi/maevsi/commit/2bafd520cf8db1082426ac4ccc7d5a38329f7be1))
* **deps:** update dependency snyk to v1.321.0 ([d5d15c6](https://github.com/maevsi/maevsi/commit/d5d15c622331ee717d7bb3942efb7eaebfa76e1a))
* **deps:** update dependency snyk to v1.346.0 ([7eeedac](https://github.com/maevsi/maevsi/commit/7eeedac10b933ec670aada78b7c409ed8a473994))
* **deps:** update dependency snyk to v1.360.0 ([4347e33](https://github.com/maevsi/maevsi/commit/4347e335fc140f2ac4ef22d01d3ea23f5baa84db))
* **deps:** update dependency snyk to v1.361.3 ([a2f666c](https://github.com/maevsi/maevsi/commit/a2f666cb6588a2b0c80a5cd509acc4936d2f0a72))
* **deps:** update dependency snyk to v1.362.1 ([96bf7ad](https://github.com/maevsi/maevsi/commit/96bf7addc7720609cfee1aab1629a2c7d9b80613))
* **deps:** update dependency snyk to v1.366.2 ([2f8e0b4](https://github.com/maevsi/maevsi/commit/2f8e0b4420c5258a92972f9f9088078b8a1dd392))
* **deps:** update dependency snyk to v1.370.1 ([a87661c](https://github.com/maevsi/maevsi/commit/a87661cbfe087d6aa195e938be640150b633c017))
* **deps:** update dependency snyk to v1.374.0 ([f3a5819](https://github.com/maevsi/maevsi/commit/f3a581915683779616fba9c7b07b5109958afb9c))
* **deps:** update dependency snyk to v1.381.2 ([0d44302](https://github.com/maevsi/maevsi/commit/0d44302d0ae4a1f37fbbdcab31ecba444ad2479a))
* **deps:** update dependency snyk to v1.386.0 ([f29e102](https://github.com/maevsi/maevsi/commit/f29e102462742f5c79017ecbee2946149858988f))
* **deps:** update dependency snyk to v1.389.0 ([3df1845](https://github.com/maevsi/maevsi/commit/3df184553a8e57e5a73170870ce3ebc1a6829657))
* **deps:** update dependency snyk to v1.393.0 ([308f5e3](https://github.com/maevsi/maevsi/commit/308f5e395504a708f3ea6f375d1cfa3919281887))
* **deps:** update dependency snyk to v1.398.1 ([acb83f5](https://github.com/maevsi/maevsi/commit/acb83f525cc511156f6493afdb3e0e624f96a9e0))
* **deps:** update dependency vue-apollo to v3.0.4 ([62a1342](https://github.com/maevsi/maevsi/commit/62a1342893cb6171c2bdd87182cafcc246744aff))
* **deps:** update font awesome ([f67971a](https://github.com/maevsi/maevsi/commit/f67971ab4c0d2ea0318726bea9fcb81182ce2362))
* **deps:** update font awesome ([3c7bfb2](https://github.com/maevsi/maevsi/commit/3c7bfb2e16c59c70d78fa059968947c7661074d2))
* **deps:** update uppy monorepo ([6c2989d](https://github.com/maevsi/maevsi/commit/6c2989d8192d65a81b208a1855ee9e384ddcb887))
* **deps:** update uppy monorepo ([bc3c105](https://github.com/maevsi/maevsi/commit/bc3c105eb0da121a8e5387b449648b6d38b48925))
* **deps:** update uppy monorepo ([d2a226e](https://github.com/maevsi/maevsi/commit/d2a226ea1ddd85731481706db01d09b71cac775b))
* **deps:** update uppy monorepo ([4c95900](https://github.com/maevsi/maevsi/commit/4c95900ca473c82f6ff61367f76169efc9f39c02))
* **deps:** update uppy monorepo ([83c7692](https://github.com/maevsi/maevsi/commit/83c76928b6561956a3d7b37d986b369bdcc91958))
* **deps:** update uppy monorepo ([a702398](https://github.com/maevsi/maevsi/commit/a7023987c0e96af2523358386d55e32346d698c0))
* **workflows/semantic-release:** add "pkgRoot", move to root ([c5c6379](https://github.com/maevsi/maevsi/commit/c5c63797a5873695d4303d46ae5a66f368974b31))
* **yarn:** add missing version to "package.json" ([b31a67e](https://github.com/maevsi/maevsi/commit/b31a67ec3ed535e505d6ec9cd0f6cdaa63643956))
* gridsome/.snyk & gridsome/package.json to reduce vulnerabilities ([70bf912](https://github.com/maevsi/maevsi/commit/70bf912a7a049d0ef3faba5c4350cffe6e00beb9))
* gridsome/.snyk & gridsome/package.json to reduce vulnerabilities ([0eb5b1a](https://github.com/maevsi/maevsi/commit/0eb5b1ace5576cd43b90a035588350848ea65616))
* gridsome/.snyk & gridsome/package.json to reduce vulnerabilities ([5fa925f](https://github.com/maevsi/maevsi/commit/5fa925fecb3020951dbf78bcd97044ce1a4a556b))
* gridsome/package.json & gridsome/yarn.lock to reduce vulnerabilities ([d9a65f6](https://github.com/maevsi/maevsi/commit/d9a65f6f312d46b6c9577bf6bd64cfa929b1badb))
* gridsome/package.json, gridsome/yarn.lock & gridsome/.snyk to reduce vulnerabilities ([8388dbc](https://github.com/maevsi/maevsi/commit/8388dbc781335407b84dcd035ac27d729e631747))


### Features

* add semantic release ([2342086](https://github.com/maevsi/maevsi/commit/2342086053ed2a428481ceffe4841a8fb89e5171))


### Reverts

* Revert "github/docker: Correct Zip" ([dbadc5b](https://github.com/maevsi/maevsi/commit/dbadc5b4fb924793f157149159d54c993b463f13))
