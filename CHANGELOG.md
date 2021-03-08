# [0.56.0](https://github.com/maevsi/maevsi/compare/0.55.0...0.56.0) (2021-03-08)


### Bug Fixes

* **sqitch:** correct invitation permissions ([07623ca](https://github.com/maevsi/maevsi/commit/07623caa072e9fd99d167888d3942372cc1839b5)), closes [#234](https://github.com/maevsi/maevsi/issues/234)


### Features

* **event-invitations:** add invitation feedback to invitation list ([8959fbc](https://github.com/maevsi/maevsi/commit/8959fbce54ed0a5a54500dc551fe270dbf9dcbdf)), closes [#239](https://github.com/maevsi/maevsi/issues/239)

# [0.55.0](https://github.com/maevsi/maevsi/compare/0.54.0...0.55.0) (2021-03-04)


### Bug Fixes

* **profile-picture:** prevent placeholder image large flashing ([448e84a](https://github.com/maevsi/maevsi/commit/448e84a6b693014e9e4b7bedf3d8a603d91afabc)), closes [#242](https://github.com/maevsi/maevsi/issues/242)


### Features

* **account:** add valid until data to notifies ([3b66392](https://github.com/maevsi/maevsi/commit/3b66392ccdee0195bf4c502fe5ee3566e4cd300c))
* **account:** display expired code state ([1040a21](https://github.com/maevsi/maevsi/commit/1040a21a96f991135f64e7d99e39c5ea51b23b81)), closes [#149](https://github.com/maevsi/maevsi/issues/149)

# [0.54.0](https://github.com/maevsi/maevsi/compare/0.53.0...0.54.0) (2021-03-03)


### Bug Fixes

* **layout:** resolve deprecated i18n function ([7d5b8eb](https://github.com/maevsi/maevsi/commit/7d5b8eb13f034b4f4867595ec5a50107f0ed417e))


### Features

* **consola:** downgrade loglevel to tracing for authentication ([0a53ea8](https://github.com/maevsi/maevsi/commit/0a53ea85b943d0cc175488e56bec98f5e4f461f4))
* **modal:** add "is" prefix to "cancellable" ([7833bf1](https://github.com/maevsi/maevsi/commit/7833bf12c20f0b0cab5fa03aaacf07b61242d4cc))
* **modal:** make modals stateful ([e1d84ec](https://github.com/maevsi/maevsi/commit/e1d84ec6c29fc0b78273f70a64f883469e59174d))
* **modal:** replace alerts ([83c724e](https://github.com/maevsi/maevsi/commit/83c724e485a185270ae89e9b2163825d9cd58c9b)), closes [#57](https://github.com/maevsi/maevsi/issues/57)
* **nuxt:** hide production and devtool tips ([d10e0df](https://github.com/maevsi/maevsi/commit/d10e0dfe5b2718bb5a4009facdd9dfc9d1630107))

# [0.53.0](https://github.com/maevsi/maevsi/compare/0.52.1...0.53.0) (2021-03-03)


### Bug Fixes

* **button-list:** move css to utility ([b65bc95](https://github.com/maevsi/maevsi/commit/b65bc959f0bc7982b8bc13d0fdd396911c34f892))
* **error:** improve display without status code ([c9d512c](https://github.com/maevsi/maevsi/commit/c9d512c8517d0b3397bd7e9d24cb67a29ed23982))
* **event:** don't return an invitation for event creator ([1f94243](https://github.com/maevsi/maevsi/commit/1f942436de82f6d87d3b8d04dea82b759213e56f)), closes [#235](https://github.com/maevsi/maevsi/issues/235)
* **event:** show 403 on insufficient permissions ([658b337](https://github.com/maevsi/maevsi/commit/658b3375f501b2f1f401820db1dfc4cefa839167)), closes [#238](https://github.com/maevsi/maevsi/issues/238)
* **event-list-item:** grey out after end ([44fe04d](https://github.com/maevsi/maevsi/commit/44fe04d2a57035b12b632046397c2dbb136865c7)), closes [#237](https://github.com/maevsi/maevsi/issues/237)
* **event-list-item:** improve truncation ([64c8e55](https://github.com/maevsi/maevsi/commit/64c8e5557b38dee3c5c1dd8b7866e0cb643c9d44))
* **layout:** add margin to the header's sides ([1e83717](https://github.com/maevsi/maevsi/commit/1e837173bd0703bc3244242648d11376aa6e491c)), closes [#232](https://github.com/maevsi/maevsi/issues/232)
* **modal:** add button list ([66d4b70](https://github.com/maevsi/maevsi/commit/66d4b702f2b56e29e537af1732f89e71fb938b8f))
* **spacer:** add button list component ([62b09d2](https://github.com/maevsi/maevsi/commit/62b09d2d721d17bc458bdf3b0ca23213441e5f4a)), closes [#231](https://github.com/maevsi/maevsi/issues/231)


### Features

* **app-link:** make link's items centered in component ([e6653aa](https://github.com/maevsi/maevsi/commit/e6653aa0fd8ecabb00deeaa2fc60461625925b22))
* **event:** validate maximum invitee count on upper end ([5d0e0f8](https://github.com/maevsi/maevsi/commit/5d0e0f8e15375218984d478aece7a03d901efd58)), closes [#233](https://github.com/maevsi/maevsi/issues/233)

## [0.52.1](https://github.com/maevsi/maevsi/compare/0.52.0...0.52.1) (2021-02-28)


### Bug Fixes

* **event:** disable html interpretation ([757298c](https://github.com/maevsi/maevsi/commit/757298c34f561ea3c64704673ce4d2423aad1753)), closes [#236](https://github.com/maevsi/maevsi/issues/236)
* remove test data ([d925916](https://github.com/maevsi/maevsi/commit/d92591683a4a92800956f3fbf2777ff29f60b11b))

# [0.52.0](https://github.com/maevsi/maevsi/compare/0.51.1...0.52.0) (2021-02-25)


### Features

* **stomper:** add i18n ([77e698b](https://github.com/maevsi/maevsi/commit/77e698bd8fb7078f600f4c86a29b8d963d94c07f))

## [0.51.1](https://github.com/maevsi/maevsi/compare/0.51.0...0.51.1) (2021-02-25)


### Bug Fixes

* **nuxt:** migrate to 2.15 ([b752021](https://github.com/maevsi/maevsi/commit/b752021b8214641fb541feec56a9d37fed0fe7f0))
* **tailwind:** remove postcss v7 compatibility ([b0a6587](https://github.com/maevsi/maevsi/commit/b0a6587f3ac68144d4de01f970c483f3f860ad0b))
* **verify:** correct page layout ([9ab8270](https://github.com/maevsi/maevsi/commit/9ab827070dc0405a0c3f4af5ae4cdbef92ab5e1f)), closes [#223](https://github.com/maevsi/maevsi/issues/223)

# [0.51.0](https://github.com/maevsi/maevsi/compare/0.50.2...0.51.0) (2021-02-21)


### Features

* **eslint:** remove unneeded prettier config ([3f71811](https://github.com/maevsi/maevsi/commit/3f7181143820a2732609fa8afbc36f94cfebfe0a))

## [0.50.2](https://github.com/maevsi/maevsi/compare/0.50.1...0.50.2) (2021-02-12)


### Bug Fixes

* **ci:** trigger on create ([1cf4d36](https://github.com/maevsi/maevsi/commit/1cf4d36423942921ce9efa5ca35ace33e6bf638c))

## [0.50.1](https://github.com/maevsi/maevsi/compare/0.50.0...0.50.1) (2021-02-01)


### Bug Fixes

* **release:** schedule release ([5349b67](https://github.com/maevsi/maevsi/commit/5349b67242be6d60455ac96d9b9e619b1821a803))

# [0.50.0](https://github.com/maevsi/maevsi/compare/0.49.0...0.50.0) (2021-01-20)


### Features

* **event:** allow to edit events ([5248596](https://github.com/maevsi/maevsi/commit/52485963cb28d61a4a3a3cc937b21afe29687b5b)), closes [#207](https://github.com/maevsi/maevsi/issues/207)

# [0.49.0](https://github.com/maevsi/maevsi/compare/0.48.0...0.49.0) (2021-01-20)


### Features

* **sqitch:** store NOTIFYs in table ([d6aa69a](https://github.com/maevsi/maevsi/commit/d6aa69aaa185af0030787a71402cb2b0424e2d41)), closes [#130](https://github.com/maevsi/maevsi/issues/130)

# [0.48.0](https://github.com/maevsi/maevsi/compare/0.47.0...0.48.0) (2021-01-20)


### Bug Fixes

* **account:** authenticate on unsuccessful refresh ([d3792e3](https://github.com/maevsi/maevsi/commit/d3792e3b88b76ed40510a381156321b2bd5e1d2d)), closes [#204](https://github.com/maevsi/maevsi/issues/204)


### Features

* **contact:** only allow existing account usernames ([5aed194](https://github.com/maevsi/maevsi/commit/5aed194010c67abc5460a62ea53dfa25316d0a31)), closes [#198](https://github.com/maevsi/maevsi/issues/198)
* **event:** add possibility to send invitations to invitees ([818fbff](https://github.com/maevsi/maevsi/commit/818fbff4dd29b58be7c02f23a61c9e46ff43bd66)), closes [#156](https://github.com/maevsi/maevsi/issues/156)

# [0.47.0](https://github.com/maevsi/maevsi/compare/0.46.1...0.47.0) (2021-01-19)


### Bug Fixes

* **auth:** correctly show access permissions for account & event ([d6800c1](https://github.com/maevsi/maevsi/commit/d6800c1dc09d816216324087af03496d577f55e9)), closes [#194](https://github.com/maevsi/maevsi/issues/194)
* **event:** set empty fields to null instead of undefined ([8d1a3ab](https://github.com/maevsi/maevsi/commit/8d1a3ab62e9ef6d9014343f79cb31447762d566e))
* **modal:** correct alert card margin ([6bb65b8](https://github.com/maevsi/maevsi/commit/6bb65b8629a4e388089b3ccc0fb201c2fbfd4be2))


### Features

* **invitation:** allow edits, show username ([6d573ca](https://github.com/maevsi/maevsi/commit/6d573cab04e719f3222d0ec999a2c0a890b7ccfd)), closes [#191](https://github.com/maevsi/maevsi/issues/191) [#192](https://github.com/maevsi/maevsi/issues/192)

## [0.46.1](https://github.com/maevsi/maevsi/compare/0.46.0...0.46.1) (2021-01-18)


### Bug Fixes

* **event:** show event's title in tab ([66d25a4](https://github.com/maevsi/maevsi/commit/66d25a4a9b32335f59e3234030f4a1d55558eea7)), closes [#193](https://github.com/maevsi/maevsi/issues/193)

# [0.46.0](https://github.com/maevsi/maevsi/compare/0.45.0...0.46.0) (2021-01-18)


### Features

* **menu:** add menu entries for event creation and unlock ([1c9efcc](https://github.com/maevsi/maevsi/commit/1c9efcc9976ffb39dde36cd0628e84294400b7a2)), closes [#154](https://github.com/maevsi/maevsi/issues/154)
* **modal:** react to escape and return key presses ([bc4eb1a](https://github.com/maevsi/maevsi/commit/bc4eb1a669414b24940de06d776b477c18d5048a)), closes [#136](https://github.com/maevsi/maevsi/issues/136)

# [0.45.0](https://github.com/maevsi/maevsi/compare/0.44.0...0.45.0) (2021-01-18)


### Bug Fixes

* **event:** don't show status code in title ([be9f0ea](https://github.com/maevsi/maevsi/commit/be9f0ea21d114a6933eadd4cb1d2ba8b71540108)), closes [#186](https://github.com/maevsi/maevsi/issues/186)
* **sql:** add minimum lengths ([8703f73](https://github.com/maevsi/maevsi/commit/8703f736561277eb94bb5834384ae69a5595f526)), closes [#183](https://github.com/maevsi/maevsi/issues/183)


### Features

* **jwt:** get rid of account_id ([76eeda7](https://github.com/maevsi/maevsi/commit/76eeda7996a13d8c4f108a2d54477c00190633eb)), closes [#181](https://github.com/maevsi/maevsi/issues/181)

# [0.44.0](https://github.com/maevsi/maevsi/compare/0.43.0...0.44.0) (2021-01-18)


### Bug Fixes

* **event-list:** center no content text ([640f2d0](https://github.com/maevsi/maevsi/commit/640f2d078bf4f1bfbf4c6f04c9ec995a4fff93bd))
* **promise:** use value, reason & .toString() ([e7300e6](https://github.com/maevsi/maevsi/commit/e7300e698cd07b3578ef807f6df5d96fe48ea26c)), closes [#178](https://github.com/maevsi/maevsi/issues/178) [#188](https://github.com/maevsi/maevsi/issues/188)


### Features

* **error:** show login button on 403 ([79b7f3c](https://github.com/maevsi/maevsi/commit/79b7f3cdc953208599c4e72251b009dadfd86b6b)), closes [#189](https://github.com/maevsi/maevsi/issues/189)
* **event:** add possibility to add invitees ([1778b5d](https://github.com/maevsi/maevsi/commit/1778b5d0702004fb6c4f2017c51fbae7ceebaed9)), closes [#60](https://github.com/maevsi/maevsi/issues/60) [#184](https://github.com/maevsi/maevsi/issues/184)

# [0.43.0](https://github.com/maevsi/maevsi/compare/0.42.2...0.43.0) (2021-01-16)


### Bug Fixes

* **button-green:** add missing type prop ([a17931c](https://github.com/maevsi/maevsi/commit/a17931c6cc90e70b7a38ba6f6bc7c13c1c4a16a0))
* **card-alert:** default to undefined ([ab07d77](https://github.com/maevsi/maevsi/commit/ab07d7787e95066060c61dc330b8096c0e765dcc))
* **loader:** prevent flicker when refetching ([28bc7fd](https://github.com/maevsi/maevsi/commit/28bc7fdda92543d52ab4af32eca20367bb30cf73))


### Features

* **event-settings:** show 403 instead of redirect ([3b553ea](https://github.com/maevsi/maevsi/commit/3b553eac53f2dd0db7dfbd0b36d1ba2392feb466))
* **modal:** rework modals ([66697cd](https://github.com/maevsi/maevsi/commit/66697cd4e93e4a9ec1b513b88e7a5eb1264e798d))
* **tailwind:** make placeholders italic and half transparent ([6e1d49e](https://github.com/maevsi/maevsi/commit/6e1d49e89ae180d6cd5e31ade1ffef322248ff2e))

## [0.42.2](https://github.com/maevsi/maevsi/compare/0.42.1...0.42.2) (2021-01-15)


### Bug Fixes

* **components:** propagate click event where possible ([f962bd5](https://github.com/maevsi/maevsi/commit/f962bd5ced6fc3fdce7775a6e8aa6a689c79aca5))
* **sqitch:** correct requires and order ([0abc6c8](https://github.com/maevsi/maevsi/commit/0abc6c8bb43c023c12dbc13fc480d6dae9c97165))
* **sqitch:** minor corrections ([3fad1f3](https://github.com/maevsi/maevsi/commit/3fad1f385fdc0fe5ed6237847af9e2b462afa7b0))

## [0.42.1](https://github.com/maevsi/maevsi/compare/0.42.0...0.42.1) (2021-01-14)


### Bug Fixes

* **apollo:** add missing consola errors ([f471873](https://github.com/maevsi/maevsi/commit/f47187359e3ce7892db61c433ff8ab0118aac488))
* **form:** default sent to false ([49ec3da](https://github.com/maevsi/maevsi/commit/49ec3daab5b1870320d2609fa0f93971e6eb86de))
* **loader:** show errors ([67b516b](https://github.com/maevsi/maevsi/commit/67b516b6c826d66d31bb5c5d75d02364c6d727f2))
* **tailwind:** apply for all placeholders ([8405389](https://github.com/maevsi/maevsi/commit/8405389b290253bffca1ae243ab30a28a1c7db69))
* **validation:** improve validators ([b70ef92](https://github.com/maevsi/maevsi/commit/b70ef92d442fe7e86dbbf76b01d7c6c1bf1b0ef4))

# [0.42.0](https://github.com/maevsi/maevsi/compare/0.41.0...0.42.0) (2021-01-13)


### Features

* add image loading indicator ([b4d3e98](https://github.com/maevsi/maevsi/commit/b4d3e988ad45a87444b108fe08c492abf42f66de)), closes [#84](https://github.com/maevsi/maevsi/issues/84)
* beautify loading indicator ([08ee54c](https://github.com/maevsi/maevsi/commit/08ee54c73e4e082f1990346caa56939219651399)), closes [#96](https://github.com/maevsi/maevsi/issues/96)

# [0.41.0](https://github.com/maevsi/maevsi/compare/0.40.0...0.41.0) (2021-01-13)


### Features

* **event:** show insufficient access permissions instead of 404 ([0cc40ce](https://github.com/maevsi/maevsi/commit/0cc40ce1ffb6ab05fb99b79784a674033d92cef7)), closes [#120](https://github.com/maevsi/maevsi/issues/120)

# [0.40.0](https://github.com/maevsi/maevsi/compare/0.39.0...0.40.0) (2021-01-13)


### Bug Fixes

* **i18n:** improve German translation for "start" ([b043849](https://github.com/maevsi/maevsi/commit/b043849ce68d07f88ff411d83d47ad4ef66fe708))


### Features

* **event:** add location form info ([11d6cda](https://github.com/maevsi/maevsi/commit/11d6cda5a95b679760722dcaa315bb2595a9ed50))
* **event-dashlet:** add titles ([4c19cd4](https://github.com/maevsi/maevsi/commit/4c19cd4d99e274398d2e29c93fb83c7b13250580))

# [0.39.0](https://github.com/maevsi/maevsi/compare/0.38.0...0.39.0) (2021-01-13)


### Bug Fixes

* **event-dashlet-attendance-type:** view icons conditionally ([4d8b054](https://github.com/maevsi/maevsi/commit/4d8b054d295b03c8a51330e72eb191d9d1035b48))


### Features

* add hamburger menu ([91a799f](https://github.com/maevsi/maevsi/commit/91a799f6798a254375b062af91b406cbc476a8b2)), closes [#138](https://github.com/maevsi/maevsi/issues/138)
* **event:** add attendance type inputs to creation form ([a3a95ae](https://github.com/maevsi/maevsi/commit/a3a95aeb3975226b95f76d5670a29b09dbde42e1)), closes [#148](https://github.com/maevsi/maevsi/issues/148)

# [0.38.0](https://github.com/maevsi/maevsi/compare/0.37.1...0.38.0) (2021-01-12)


### Features

* **form:** mark required form inputs as such ([a890583](https://github.com/maevsi/maevsi/commit/a890583ccdade365b7ecdff14f9594e6eeb1cf17)), closes [#150](https://github.com/maevsi/maevsi/issues/150)
* **sitemap:** exclude teapot, enable i18n ([b8b2f29](https://github.com/maevsi/maevsi/commit/b8b2f2985dbf064966aee8795c9556ef5594b5c4))

## [0.37.1](https://github.com/maevsi/maevsi/compare/0.37.0...0.37.1) (2021-01-11)


### Bug Fixes

* **release:** schedule release ([16df556](https://github.com/maevsi/maevsi/commit/16df5565f8ad0bc73fe50b4eaa4859e69436ac2a))

# [0.37.0](https://github.com/maevsi/maevsi/compare/0.36.0...0.37.0) (2020-12-31)


### Features

* **event:** add attendance type ([8521d5a](https://github.com/maevsi/maevsi/commit/8521d5abf9553adb25585ebd31e3e45f0a6bb994)), closes [#124](https://github.com/maevsi/maevsi/issues/124)
* **sqitch/event:** add "is_" prefix to boolean column ([13f634c](https://github.com/maevsi/maevsi/commit/13f634cfb9c9616249b287dad19e286623641cc0))
* create task page directory ([b13bf1e](https://github.com/maevsi/maevsi/commit/b13bf1ead06e725589737446f3fe9042c7cf522a))

# [0.36.0](https://github.com/maevsi/maevsi/compare/0.35.2...0.36.0) (2020-12-31)


### Features

* **browserslist:** improve wording ([3d42c93](https://github.com/maevsi/maevsi/commit/3d42c93b16241067fa33c8f8a13201830a2d139f)), closes [#141](https://github.com/maevsi/maevsi/issues/141)
* **unlock:** discard "redeem" ([3c559c6](https://github.com/maevsi/maevsi/commit/3c559c6c4a92056b357466c2fea3356028d6f8a0)), closes [#140](https://github.com/maevsi/maevsi/issues/140)

## [0.35.2](https://github.com/maevsi/maevsi/compare/0.35.1...0.35.2) (2020-12-30)


### Bug Fixes

* **form:** fix typo ([f935c15](https://github.com/maevsi/maevsi/commit/f935c15eb0134439a4311a52ee1e3f17a800ed6c))
* **form:** validate some input fields on blur, not on input ([9858ed6](https://github.com/maevsi/maevsi/commit/9858ed6d479bfb47f240b70e920a6e607d70f46d)), closes [#147](https://github.com/maevsi/maevsi/issues/147)

## [0.35.1](https://github.com/maevsi/maevsi/compare/0.35.0...0.35.1) (2020-12-30)


### Bug Fixes

* **event:** correct event icon usage ([895d402](https://github.com/maevsi/maevsi/commit/895d402e3981fb9e29a6f2640b10849ae6e57090))
* **form:** correct form sent usage ([256260d](https://github.com/maevsi/maevsi/commit/256260dca9a84c35c1e58b9d980a338c1cc06963)), closes [#133](https://github.com/maevsi/maevsi/issues/133)

# [0.35.0](https://github.com/maevsi/maevsi/compare/0.34.0...0.35.0) (2020-12-30)


### Bug Fixes

* minor fixes ([fda2ecb](https://github.com/maevsi/maevsi/commit/fda2ecbfdcacb1b6a1dfa2263b09edb2bd125e12))
* **tailwind:** capitalize default ([1affad5](https://github.com/maevsi/maevsi/commit/1affad55b04983ed16a46a8bdf9053043e3764bd))


### Features

* **tailwind:** rework cards ([53056d0](https://github.com/maevsi/maevsi/commit/53056d0653f0c7ed4b17a8e7e2a45565a159f56a)), closes [#143](https://github.com/maevsi/maevsi/issues/143)
* **tailwind:** use card in more places ([61f4956](https://github.com/maevsi/maevsi/commit/61f4956c843f2f10f379633fcee368c168ee665f))

# [0.34.0](https://github.com/maevsi/maevsi/compare/0.33.2...0.34.0) (2020-12-30)


### Bug Fixes

* **event:** remove incorrect class ([b9f720d](https://github.com/maevsi/maevsi/commit/b9f720d5043980176791488f3e4ade7bee6327bf))


### Features

* **event:** remove ornament ([59e3066](https://github.com/maevsi/maevsi/commit/59e30660856d162617500702563cc234eba33b74))
* **ical:** add event url to top of description ([4efea63](https://github.com/maevsi/maevsi/commit/4efea63769087db83114f4fff6ce70c6e8770edf))
* **legal/privacy:** use new email addresses ([aba6dac](https://github.com/maevsi/maevsi/commit/aba6dacc7a641db20b30896f00578ae2d2341b01))
* **tailwind:** upgrade to tailwind v2 ([b7cf998](https://github.com/maevsi/maevsi/commit/b7cf998b72dcaa859e8c75702a8ffcc5dd82c241))

## [0.33.2](https://github.com/maevsi/maevsi/compare/0.33.1...0.33.2) (2020-12-29)


### Bug Fixes

* **modal:** remove body slot property ([b11361f](https://github.com/maevsi/maevsi/commit/b11361f3ee69bbf3f88e3038051a4a08dc89bb5c))

## [0.33.1](https://github.com/maevsi/maevsi/compare/0.33.0...0.33.1) (2020-12-27)


### Bug Fixes

* **nuxt:** correct build module definition ([d42f4a0](https://github.com/maevsi/maevsi/commit/d42f4a0eb12d900d61874e09e3c91c0fbec43997))

# [0.33.0](https://github.com/maevsi/maevsi/compare/0.32.0...0.33.0) (2020-12-27)


### Features

* add google analytics & adsense ([10f9593](https://github.com/maevsi/maevsi/commit/10f959395e48811b9fb0710f7cc01963f211829e))

# [0.32.0](https://github.com/maevsi/maevsi/compare/0.31.0...0.32.0) (2020-12-24)


### Bug Fixes

* add missing button types ([caf1400](https://github.com/maevsi/maevsi/commit/caf1400367e8e30071ea508310143100959bb55f))
* **app-link:** add link component ([3b9b27d](https://github.com/maevsi/maevsi/commit/3b9b27d21632ba3d9258fc327bc60f1f0f3936a5))
* **legal-notice:** correct links and title ([46c9ec9](https://github.com/maevsi/maevsi/commit/46c9ec989a7eee5c2a0955aa6483eccbc1cf7d74))


### Features

* **redeem:** add automatic input information ([7c8a2d3](https://github.com/maevsi/maevsi/commit/7c8a2d3d797c2c908973c16fe78c095d157b091c))
* **redeem:** add input id suffix ([8ac25c8](https://github.com/maevsi/maevsi/commit/8ac25c8ebcba5481fa90c56486b3136efe07e141))

# [0.31.0](https://github.com/maevsi/maevsi/compare/0.30.3...0.31.0) (2020-12-24)


### Bug Fixes

* **eslint:** mark promises as polyfilled ([11dca61](https://github.com/maevsi/maevsi/commit/11dca61485e5e2215a8c35b59a3427abf9cb8a72))


### Features

* add browserslist ([91e6e5b](https://github.com/maevsi/maevsi/commit/91e6e5bf3191ff107b74333c9c7258a26a039471))
* add warning on unsupported browser ([2eba21a](https://github.com/maevsi/maevsi/commit/2eba21a5ae122cf2b0d7bbddd7f3efcab8fa1af1))

## [0.30.3](https://github.com/maevsi/maevsi/compare/0.30.2...0.30.3) (2020-12-24)


### Bug Fixes

* **legal-notice:** correct name ([364f27e](https://github.com/maevsi/maevsi/commit/364f27e0f32a090d8222d8bab5ae3a69144265df))
* **sqitch/account:** add missing columns to verify ([c5426ad](https://github.com/maevsi/maevsi/commit/c5426adc00a52e7ec5ace4847e5edbc59b69e840))
* **sqitch/authenticate:** add missing require ([79a91f8](https://github.com/maevsi/maevsi/commit/79a91f84794b8c3a5cd46df68700c69dc7b44d2e))

## [0.30.2](https://github.com/maevsi/maevsi/compare/0.30.1...0.30.2) (2020-12-21)


### Bug Fixes

* **release:** schedule release ([85cdb85](https://github.com/maevsi/maevsi/commit/85cdb85cf6d1a1868b102e4c694b0fdf9151fbe5))

## [0.30.1](https://github.com/maevsi/maevsi/compare/0.30.0...0.30.1) (2020-12-09)


### Bug Fixes

* **event:** add missing img alt ([df719a5](https://github.com/maevsi/maevsi/commit/df719a516bfdfee8ea42f6366a9e477448d9433d))

# [0.30.0](https://github.com/maevsi/maevsi/compare/0.29.2...0.30.0) (2020-12-07)


### Features

* **redeem:** rename submit button ([dfa81e8](https://github.com/maevsi/maevsi/commit/dfa81e87c3a4ac580595c6b0ea3369b5f92db093))

## [0.29.2](https://github.com/maevsi/maevsi/compare/0.29.1...0.29.2) (2020-12-06)


### Bug Fixes

* **docker:** add missing production node environment variable ([795607e](https://github.com/maevsi/maevsi/commit/795607eb7b639001819c1dd79ce48ef38462cfca))

## [0.29.1](https://github.com/maevsi/maevsi/compare/0.29.0...0.29.1) (2020-12-06)


### Bug Fixes

* **docker:** skip husky installation ([c9394e6](https://github.com/maevsi/maevsi/commit/c9394e6d5ec4b19054fc7d2d48dbe80f57169190))

# [0.29.0](https://github.com/maevsi/maevsi/compare/0.28.0...0.29.0) (2020-12-06)


### Features

* **redeem:** further explanation optimization ([56607b6](https://github.com/maevsi/maevsi/commit/56607b6851b512be033234d2d8de39789c4baf83))

# [0.28.0](https://github.com/maevsi/maevsi/compare/0.27.0...0.28.0) (2020-12-06)


### Bug Fixes

* **redeem:** use autofill in `mounted` instead of `created` ([4e485ec](https://github.com/maevsi/maevsi/commit/4e485ec9f491d8f8beb797781d33d21d8fbcab8a))


### Features

* **redeem:** disable use check ([fce6a0f](https://github.com/maevsi/maevsi/commit/fce6a0fa5eeffd39b4e0753937d05b3acb9da44e))
* **redeem:** further improve description ([33615e4](https://github.com/maevsi/maevsi/commit/33615e4b15671fce367e096e5ba6415b38663836))

# [0.27.0](https://github.com/maevsi/maevsi/compare/0.26.0...0.27.0) (2020-12-05)


### Bug Fixes

* **modal:** make body slot default ([04a5892](https://github.com/maevsi/maevsi/commit/04a5892fcf2fb38e5877c7dda939bef7451e28cc))
* **nuxt:** add missing icon ([6cec8c8](https://github.com/maevsi/maevsi/commit/6cec8c828c1a16cd6bfc4209c071ed12d9225a74))


### Features

* **event:** use modal instead of alert ([570046c](https://github.com/maevsi/maevsi/commit/570046c3934ddae8575e925beb972710b82cd3c8))
* **nuxt:** add html validator ([93f1694](https://github.com/maevsi/maevsi/commit/93f169481355d66a53e22ab5832f0129e4e1e987))
* **redeem:** use modal instead of alert ([bf3fd93](https://github.com/maevsi/maevsi/commit/bf3fd939914872ea5027920946a208114294a3fc))
* **tailwind:** add prose list styles ([ffd0473](https://github.com/maevsi/maevsi/commit/ffd0473bb562821517cd4215ac0453b77ca603b6))

# [0.26.0](https://github.com/maevsi/maevsi/compare/0.25.4...0.26.0) (2020-12-05)


### Bug Fixes

* **event:** correct margin ([6bb7327](https://github.com/maevsi/maevsi/commit/6bb73278acc1f4c62e58ee95b26a3edb9653d4a8))
* **event:** improve iCal button's text ([8743e6d](https://github.com/maevsi/maevsi/commit/8743e6d46bffd501e665ab85193a6f2ae9d7273a))


### Features

* **event:** add ornament ([fad5827](https://github.com/maevsi/maevsi/commit/fad5827c982809630fcce3c8065d67493bb0fd4c))
* **event:** improve feedback form ([49828ea](https://github.com/maevsi/maevsi/commit/49828ea41a65aa04ed78f35e8591eed0b0ae0dce))
* **redeem:** show appropriate text for automatic fill ([f49c77b](https://github.com/maevsi/maevsi/commit/f49c77bbaf655892e975b67ea1f373cba1fa12a6))

## [0.25.4](https://github.com/maevsi/maevsi/compare/0.25.3...0.25.4) (2020-12-04)


### Bug Fixes

* **global:** correct `storeJwt` then function notation ([68430d1](https://github.com/maevsi/maevsi/commit/68430d132e97d8c5e160776f2c44dd1e4588213f))
* **nuxt:** add cloudflare insights to csp ([8b5fb94](https://github.com/maevsi/maevsi/commit/8b5fb949cabd5534fd734b99637abd260a9bb759))

## [0.25.3](https://github.com/maevsi/maevsi/compare/0.25.2...0.25.3) (2020-12-04)


### Bug Fixes

* **event:** fix invitation card selection ([393af9e](https://github.com/maevsi/maevsi/commit/393af9ef4135e496cce5826859943b870cda39b2))

## [0.25.2](https://github.com/maevsi/maevsi/compare/0.25.1...0.25.2) (2020-12-04)


### Bug Fixes

* **event:** correct variable name (`firstName`) ([38ae41e](https://github.com/maevsi/maevsi/commit/38ae41e6e9e681ca11c8b5f88de5ae35c3186b96))
* **event:** fix accept / cancel invite button alignment ([b08d799](https://github.com/maevsi/maevsi/commit/b08d79994c8f1d6fd9d094ecf5fa855a5169b4de))

## [0.25.1](https://github.com/maevsi/maevsi/compare/0.25.0...0.25.1) (2020-12-04)


### Bug Fixes

* **event:** add missing form feedback ([f2e9f5d](https://github.com/maevsi/maevsi/commit/f2e9f5d7e222392a7ea32b1add3c812d66474589))
* **event:** correct iCal download button's hitbox ([3931366](https://github.com/maevsi/maevsi/commit/393136631859e1fc29fc7916626ebb08a94cda56))

# [0.25.0](https://github.com/maevsi/maevsi/compare/0.24.2...0.25.0) (2020-12-04)


### Bug Fixes

* **account:** correct function owner ([4819ae1](https://github.com/maevsi/maevsi/commit/4819ae135199ae781280a98cd329d1c8be06fba6))
* **account:** sign out after account deletion ([6032cb3](https://github.com/maevsi/maevsi/commit/6032cb343ccd8b48cce790df2792be598ab28663))
* **authenticate:** invalidate reset code on successful sign in ([65a47ae](https://github.com/maevsi/maevsi/commit/65a47ae25f8db700b332c6fb9926d122a534d183))
* **event:** prevent error on deletion ([75608a6](https://github.com/maevsi/maevsi/commit/75608a66622c539f97f04019ed7bec2c314a42b9))


### Features

* **account:** add code validities ([3100650](https://github.com/maevsi/maevsi/commit/31006509aaee0ff69285f41b7bab627398f5888d)), closes [#108](https://github.com/maevsi/maevsi/issues/108)

## [0.24.2](https://github.com/maevsi/maevsi/compare/0.24.1...0.24.2) (2020-12-01)


### Bug Fixes

* **event-list:** improve show event list button condition ([9e745a4](https://github.com/maevsi/maevsi/commit/9e745a449568dc64b3a6f216996c55247ffd30fb))

## [0.24.1](https://github.com/maevsi/maevsi/compare/0.24.0...0.24.1) (2020-11-30)


### Bug Fixes

* **release:** schedule release ([d5dd509](https://github.com/maevsi/maevsi/commit/d5dd5096b2298005f8ed239cb7f524403ed753b6))

# [0.24.0](https://github.com/maevsi/maevsi/compare/0.23.1...0.24.0) (2020-11-22)


### Bug Fixes

* **event-new:** correct typo ([63e49e4](https://github.com/maevsi/maevsi/commit/63e49e471857d3e66e5d6c721ba8b83de5c61949))


### Features

* add event description render preview ([b06717c](https://github.com/maevsi/maevsi/commit/b06717c8db82e84e6bae4858dff8a3cba129d84b)), closes [#98](https://github.com/maevsi/maevsi/issues/98)
* **event-list:** add event list button ([27ae1ce](https://github.com/maevsi/maevsi/commit/27ae1ce3a149db860a766a7825eae92c5c0ea077))

## [0.23.1](https://github.com/maevsi/maevsi/compare/0.23.0...0.23.1) (2020-11-17)


### Bug Fixes

* **lint:** use input events ([3f27f6d](https://github.com/maevsi/maevsi/commit/3f27f6db9658b414e207bb56ac501a312cea614d))

# [0.23.0](https://github.com/maevsi/maevsi/compare/0.22.0...0.23.0) (2020-11-17)


### Bug Fixes

* **account:** revert query watching ([c30c648](https://github.com/maevsi/maevsi/commit/c30c648b9953a69abdf0ab222cbe42ba856030bd))
* **redeem:** adapt form reset ([ba465be](https://github.com/maevsi/maevsi/commit/ba465be0da98b78cf38886a85c1d146edb0b2e3d))
* **sqitch:** add missing requirement ([66c94c4](https://github.com/maevsi/maevsi/commit/66c94c43e439d126af8f970746a24f69a438c330))
* **sqitch:** disable `pg_notify` on email address verification ([5884f0d](https://github.com/maevsi/maevsi/commit/5884f0df845c842cafdd46bae08ad53da278396b))


### Features

* add password forgotten dialog ([3eca4f9](https://github.com/maevsi/maevsi/commit/3eca4f9198996d4c5c32aae918b1edbec78a0565)), closes [#95](https://github.com/maevsi/maevsi/issues/95)
* **verify:** redirect on incorrect format ([7f49c05](https://github.com/maevsi/maevsi/commit/7f49c05c908e971a71c85c96831b13b6b7a2da1a))

# [0.22.0](https://github.com/maevsi/maevsi/compare/0.21.0...0.22.0) (2020-11-17)


### Bug Fixes

* **error:** properly convert to Number ([0d86c48](https://github.com/maevsi/maevsi/commit/0d86c4834355176ee010ce7ce58949213ee1d250))
* **loader:** add `loading` prop ([ab529e0](https://github.com/maevsi/maevsi/commit/ab529e0d7a9e601e7e29ecc23e2ed212c51fc01d))
* **validate:** correct validation ([d1552c6](https://github.com/maevsi/maevsi/commit/d1552c6bab941b100298e33d1adae90ef7d03343))


### Features

* add account confirmation ([4e7e1f9](https://github.com/maevsi/maevsi/commit/4e7e1f9dc3203eb541024e7a4eb63050111e8a2a)), closes [#34](https://github.com/maevsi/maevsi/issues/34)

# [0.21.0](https://github.com/maevsi/maevsi/compare/0.20.1...0.21.0) (2020-11-15)


### Features

* **error:** add emoji ([2d3cb40](https://github.com/maevsi/maevsi/commit/2d3cb403b7ca7e8244fc1d89db8d9a73e82cb23f))

## [0.20.1](https://github.com/maevsi/maevsi/compare/0.20.0...0.20.1) (2020-11-14)


### Bug Fixes

* **event:** add missing `nofollow` value ([26cf6d0](https://github.com/maevsi/maevsi/commit/26cf6d0df433d6c7a8663036357d587927854b15))
* **sqitch:** add missing plan entries ([8e30965](https://github.com/maevsi/maevsi/commit/8e3096561a037bc5a2ee8b74cd43f899a29c9bd9))

# [0.20.0](https://github.com/maevsi/maevsi/compare/0.19.0...0.20.0) (2020-11-14)


### Features

* **error:** add first `maev.no` implementation ([0a05b24](https://github.com/maevsi/maevsi/commit/0a05b243b3f814b7c188906f521e64ea4daa9d11))

# [0.19.0](https://github.com/maevsi/maevsi/compare/0.18.0...0.19.0) (2020-11-14)


### Bug Fixes

* add missing labels ([cb9a6f5](https://github.com/maevsi/maevsi/commit/cb9a6f5431f8d1ccb11f4217efd1c0d42b28944d))
* **form:** add label for inputs ([e913ee4](https://github.com/maevsi/maevsi/commit/e913ee4c38fd6b6489ad70c115f989eb116ea7c3))
* **i18n:** hide fallback warnings ([1126084](https://github.com/maevsi/maevsi/commit/11260847d37334b9a8149b063674a4eee06d4ed0))
* **images:** translate alternative text ([39ee995](https://github.com/maevsi/maevsi/commit/39ee9956556062e40f600da92a39d226ff4b6030))


### Features

* **event:** add anchor attributes in rendered markdown ([31eb7e5](https://github.com/maevsi/maevsi/commit/31eb7e53dfe6b6bd05496c2e9f3691c9781f7cbb)), closes [#89](https://github.com/maevsi/maevsi/issues/89)

# [0.18.0](https://github.com/maevsi/maevsi/compare/0.17.1...0.18.0) (2020-11-13)


### Bug Fixes

* **apollo:** add `clientMutationId` and `id` properties ([a309845](https://github.com/maevsi/maevsi/commit/a3098456d0e5cfc5b39d066828f46165978a92ef))
* **delete:** remove duplicate variable ([699af39](https://github.com/maevsi/maevsi/commit/699af397ab21ef134b67ee2b393afba5a8d68875))
* **nuxt:** add name to meta description tag ([85292a1](https://github.com/maevsi/maevsi/commit/85292a16bafcd8be815ed9e357e8772d72041c89)), closes [#87](https://github.com/maevsi/maevsi/issues/87)
* **paging:** return previous when no more data ([a42eb81](https://github.com/maevsi/maevsi/commit/a42eb81015c5882cb405dd8351cf5738f72750d0))
* several correction II ([fb8cda4](https://github.com/maevsi/maevsi/commit/fb8cda485bf672e36670433156b4bbd3da1df34f))
* **sqitch:** several corrections ([bf437b6](https://github.com/maevsi/maevsi/commit/bf437b64ec41d4683e8e430d2b489681078ea073))


### Features

* add delete buttons ([02cbcd9](https://github.com/maevsi/maevsi/commit/02cbcd9c9a9784e9076c6a360f78a603623c819b)), closes [#64](https://github.com/maevsi/maevsi/issues/64)
* **sqitch:** add "BIGSERIAL" primary keys ([fe48ca7](https://github.com/maevsi/maevsi/commit/fe48ca71a902b5e1b2d458890f948ee507221650))

## [0.17.1](https://github.com/maevsi/maevsi/compare/0.17.0...0.17.1) (2020-11-12)


### Bug Fixes

* **tailwind:** use font-display "swap" ([388bf6e](https://github.com/maevsi/maevsi/commit/388bf6e02023053e97b70417729ccdf9d52949bd))

# [0.17.0](https://github.com/maevsi/maevsi/compare/0.16.0...0.17.0) (2020-11-12)


### Bug Fixes

* **apollo:** unify loading readers ([4e992b4](https://github.com/maevsi/maevsi/commit/4e992b41b106ee2f7edd96be6caa53beb81a5987))
* **event-list:** correct heading display ([4d564b3](https://github.com/maevsi/maevsi/commit/4d564b3f5f114e1d2f00bac0fb32f4e8fc4a2fc5))
* **modal:** use default button ([bb5b70c](https://github.com/maevsi/maevsi/commit/bb5b70c3f526ca5d58cfa15e689d97aa681780e0))


### Features

* **nuxt:** change title separator to "·" ([c942ec6](https://github.com/maevsi/maevsi/commit/c942ec6d27a9eb138dc1f305ac770465083c74f2))
* **nuxt:** error page ([6abaf6c](https://github.com/maevsi/maevsi/commit/6abaf6c61922e6de2f83db3d7444995f99f6341f)), closes [#79](https://github.com/maevsi/maevsi/issues/79) [#81](https://github.com/maevsi/maevsi/issues/81)

# [0.16.0](https://github.com/maevsi/maevsi/compare/0.15.0...0.16.0) (2020-11-12)


### Features

* add success message to redeem ([2e782b4](https://github.com/maevsi/maevsi/commit/2e782b482075658eb6f46675a3f17e58bd2dee7d)), closes [#82](https://github.com/maevsi/maevsi/issues/82)
* check if invitation code was already redeemed ([d828bca](https://github.com/maevsi/maevsi/commit/d828bca135dd6393a4078874ec635fb5aae31886))

# [0.15.0](https://github.com/maevsi/maevsi/compare/0.14.2...0.15.0) (2020-11-12)


### Bug Fixes

* **button:** emit clicks ([dacda0d](https://github.com/maevsi/maevsi/commit/dacda0d6f6f44ae4cdd6af39248ccdb9c1b93f8c))
* **button:** use right margin only for filled slots ([a2e91a6](https://github.com/maevsi/maevsi/commit/a2e91a61d6803e081a9f3dbdd5780609db6f9acf))
* **layout:** add missing translations, align items right ([a84522e](https://github.com/maevsi/maevsi/commit/a84522eb7c11fb79ff18faa8a29c3cd924f96eae))
* **log-out:** clear store instead of resetting ([86f7f75](https://github.com/maevsi/maevsi/commit/86f7f75edcb7db9d01d0af57eeba12adddfb94c1))
* **moment:** use correct language ([fbfa3e0](https://github.com/maevsi/maevsi/commit/fbfa3e0ce18808663916ac0be5262adbf240f07a))


### Features

* **session:** add session management page ([d1fd221](https://github.com/maevsi/maevsi/commit/d1fd22128d4afbe616b776f36dfbc1bccf41e259))

## [0.14.2](https://github.com/maevsi/maevsi/compare/0.14.1...0.14.2) (2020-11-11)


### Bug Fixes

* **event:** check optional fields for empty value ([cf019e4](https://github.com/maevsi/maevsi/commit/cf019e437fd8ecc93933b6469531a21a61613f70)), closes [#80](https://github.com/maevsi/maevsi/issues/80)
* validate html ([4520021](https://github.com/maevsi/maevsi/commit/4520021c3db7d6ea3e86460c3378e4f0fc9b57e1)), closes [#78](https://github.com/maevsi/maevsi/issues/78)
* **button:** properly pass type attribute ([ee41f43](https://github.com/maevsi/maevsi/commit/ee41f4339c9d82ead3878b0a78f73762aaa788e9))
* **croppa:** disable white space ([85c0914](https://github.com/maevsi/maevsi/commit/85c0914be556b0bc8baf82654ca9f3a8828f8265))

## [0.14.1](https://github.com/maevsi/maevsi/compare/0.14.0...0.14.1) (2020-11-06)


### Bug Fixes

* **event-contact-feedback-data:** add null check ([646bbd4](https://github.com/maevsi/maevsi/commit/646bbd48fa986ca9c02fbcc310b119eb56ddc246))

# [0.14.0](https://github.com/maevsi/maevsi/compare/0.13.0...0.14.0) (2020-11-02)


### Bug Fixes

* **event:** display greeting only when invited ([cb72795](https://github.com/maevsi/maevsi/commit/cb7279501047e57b8bcdbd631bf80f4bb2c9b14c))
* **event-list:** improve html validity ([a73f842](https://github.com/maevsi/maevsi/commit/a73f842ada495a58f1a57e2014ad3af00565bcf1))


### Features

* **event:** display owner, linked & highlighted ([84e7b26](https://github.com/maevsi/maevsi/commit/84e7b26325c30636f2e7aa797735b40e358317ad))

# [0.13.0](https://github.com/maevsi/maevsi/compare/0.12.0...0.13.0) (2020-11-02)


### Bug Fixes

* **ical:** download as blob ([91dcde7](https://github.com/maevsi/maevsi/commit/91dcde73aa50f0a29fa7656caee12c1babcd02ac)), closes [#76](https://github.com/maevsi/maevsi/issues/76)
* **sqitch:** correct parameter order & syntax ([69d9d0b](https://github.com/maevsi/maevsi/commit/69d9d0b71f1f3f301503b92d2d65f8cf1adf374a))


### Features

* **event-list:** highlight own events ([e04c48b](https://github.com/maevsi/maevsi/commit/e04c48bdd9a42a1f8ca954e390cdde9c2b9f559b))
* **event-list:** show event owner ([a3c9cee](https://github.com/maevsi/maevsi/commit/a3c9cee7417cfb1169cb044934c57935c6c95c97))

# [0.12.0](https://github.com/maevsi/maevsi/compare/0.11.1...0.12.0) (2020-11-02)


### Bug Fixes

* **image-upload:** use same parameter set ([805300e](https://github.com/maevsi/maevsi/commit/805300ed9dd02bd893efbda641c4fa5ceed3b17f)), closes [#44](https://github.com/maevsi/maevsi/issues/44)
* **modal:** support overflow ([1ea09e7](https://github.com/maevsi/maevsi/commit/1ea09e7ea7266219eaa78170459c4dd42095e809))
* **settings:** add missing middleware ([401174a](https://github.com/maevsi/maevsi/commit/401174ad133e9b75893bff0b8aae52f796aadcdb))
* several minor fixes ([5403188](https://github.com/maevsi/maevsi/commit/5403188f5adb8340e3f9c5d3fe5dba7587dfa3ee))


### Features

* **image-upload:** improve size display ([a67e86a](https://github.com/maevsi/maevsi/commit/a67e86a1823ef050e5472bfa7e2fe10d5ab1172f))

## [0.11.1](https://github.com/maevsi/maevsi/compare/0.11.0...0.11.1) (2020-11-01)


### Bug Fixes

* **event-list:** show non-markdown description preview ([a2c3227](https://github.com/maevsi/maevsi/commit/a2c32279d1a0aaedc120c589f73f2ad1a4b696a2)), closes [#77](https://github.com/maevsi/maevsi/issues/77)

# [0.11.0](https://github.com/maevsi/maevsi/compare/0.10.0...0.11.0) (2020-11-01)


### Features

* add external link icon if link's "after" pseudo class ([a8871ee](https://github.com/maevsi/maevsi/commit/a8871ee1be029e922cebe239c615f0a0c6c34071))
* add imprint & privacy policy ([26180f8](https://github.com/maevsi/maevsi/commit/26180f83599c17e55538396cbbe1940c2ac4041f)), closes [#71](https://github.com/maevsi/maevsi/issues/71) [#72](https://github.com/maevsi/maevsi/issues/72)
* color links in blue ([be0dad9](https://github.com/maevsi/maevsi/commit/be0dad9298762a306da1585dacfa44cdb2d53821))

# [0.10.0](https://github.com/maevsi/maevsi/compare/0.9.1...0.10.0) (2020-11-01)


### Bug Fixes

* **csp:** add tusd as image source ([a45fa47](https://github.com/maevsi/maevsi/commit/a45fa4770a5ef5729479caacf094f29387ce98f0))
* **event:** correct invitee count check ([4df08f9](https://github.com/maevsi/maevsi/commit/4df08f97fec84f314f53223886464daed5fcea73))
* **event:** remove text size class ([b2919c8](https://github.com/maevsi/maevsi/commit/b2919c8c7f35c0c332c58211695ed79b904c4d37))


### Features

* **uploads:** add upload size indication ([a4a88fe](https://github.com/maevsi/maevsi/commit/a4a88fed1a8745b963663c00e91586709cffcbe3))

## [0.9.1](https://github.com/maevsi/maevsi/compare/0.9.0...0.9.1) (2020-10-31)


### Bug Fixes

* **ical:** migrate to html-to-text v6 ([8133501](https://github.com/maevsi/maevsi/commit/81335017fca5830813f7606bef840517d2fb8e69))

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
