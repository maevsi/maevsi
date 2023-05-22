# [1.17.0-beta.4](https://github.com/maevsi/maevsi/compare/1.17.0-beta.3...1.17.0-beta.4) (2023-05-20)


### Bug Fixes

* **ofetch:** access raw data ([8968f1b](https://github.com/maevsi/maevsi/commit/8968f1bd4bcf6bc9fb96e480ab9ed78275dc8f3e))


### Features

* **auth-key:** do not fetch raw ([c4be6b9](https://github.com/maevsi/maevsi/commit/c4be6b90e939116ea99013b11d958e2b03908721))

# [1.17.0-beta.3](https://github.com/maevsi/maevsi/compare/1.17.0-beta.2...1.17.0-beta.3) (2023-05-15)


### Bug Fixes

* **npm:** correct configuration placement ([9b9c8ef](https://github.com/maevsi/maevsi/commit/9b9c8ef0afc31e7e69413757d59729d5b8c13bec))
* **nuxt:** add npm configuration ([4d3500d](https://github.com/maevsi/maevsi/commit/4d3500d8e0d35e2ebeaedbeeb1ed5bf9f0a2c5c7))
* **nuxt:** correct docker development stage ([48d0901](https://github.com/maevsi/maevsi/commit/48d090130395836cbd0da476f3336426e632c880))
* **nuxt:** optimize entrypoints by using pnpm rebuild ([a0fa05c](https://github.com/maevsi/maevsi/commit/a0fa05cf80eae3d5130b5bec527064b4852a0a11))
* revert "perf(docker): let integration tests run in parallel" ([35d7c1c](https://github.com/maevsi/maevsi/commit/35d7c1ccb20a2e41996d8301435567f20afbfee8))
* **sqitch:** add docker entrypoint ([5f33e09](https://github.com/maevsi/maevsi/commit/5f33e0997c5d972b3b295ea306ce7a2a133c06c3))
* **sqitch:** correct schema update script ([0fad3e0](https://github.com/maevsi/maevsi/commit/0fad3e07dc0274103619342bd29298777b455663))
* **sqitch:** let docker sleep indefinetly ([fa28851](https://github.com/maevsi/maevsi/commit/fa28851f5f4a16c6d7580c5431b0e10e38e5abd8))


### Features

* **nuxt:** strip sqitch from Dockerfile ([7dd1b15](https://github.com/maevsi/maevsi/commit/7dd1b1576e707dc38f2433586fe5b3898cc65012))
* **sqitch:** remove ([b21c45e](https://github.com/maevsi/maevsi/commit/b21c45eb8a9a272c811a4bda0b8ab0b368e57fc7))


### Performance Improvements

* **docker:** let integration tests run in parallel ([b0e6040](https://github.com/maevsi/maevsi/commit/b0e6040f2426ad77a63107baf7efd12eb881dfbd))
* **nuxt:** optimize dockerfile order ([99b2da8](https://github.com/maevsi/maevsi/commit/99b2da864a8b448a64e879ea8d4e854d819d2944))

# [1.17.0-beta.2](https://github.com/maevsi/maevsi/compare/1.17.0-beta.1...1.17.0-beta.2) (2023-05-11)


### Features

* **server:** use h3 instead of node:http ([ad1a595](https://github.com/maevsi/maevsi/commit/ad1a595de1495b7d8b79062133a0f8d099e4f3b6))

# [1.17.0-beta.1](https://github.com/maevsi/maevsi/compare/1.16.0...1.17.0-beta.1) (2023-05-11)


### Bug Fixes

* **chore:** fix pnpm-lock ([ea0f269](https://github.com/maevsi/maevsi/commit/ea0f26939288c06b142a8f7d35e6a61739161463))
* **chore:** rearrange imports properly ([05eb798](https://github.com/maevsi/maevsi/commit/05eb798927b8738e971c523ce688d48217319f91))
* **chore:** remove downgrading pinia ([4384806](https://github.com/maevsi/maevsi/commit/4384806fd3a873513e6827774f21db60ed6ec286))
* **chore:** update package json and pnpm lock ([b958d80](https://github.com/maevsi/maevsi/commit/b958d80eae7431d237e3d1a697ae907fb1d1b28e))
* **constants:** use X-Turnstile-Key as header for the turnstile key ([18c43b0](https://github.com/maevsi/maevsi/commit/18c43b05865fcccfcc7bbc740ded5ea84564c7ba))
* **csp:** use correct csp for turnstile ([262dde1](https://github.com/maevsi/maevsi/commit/262dde19daee825648343535f32aabeb6003010a))
* **cypress:** correct csp test ([a209a16](https://github.com/maevsi/maevsi/commit/a209a163c5a47ca68bc4a71972cdcf408b72529d))
* **form-input-captcha:** hide when testing ([1796d3a](https://github.com/maevsi/maevsi/commit/1796d3a228a2df77c1578f2eb75e4ff99ceb4094))
* **form-input-captcha:** let visibility default to true ([fc164e2](https://github.com/maevsi/maevsi/commit/fc164e2f9d36bb1a07d9b3744da5f59584438812))
* **form:** do not use overflow ([3499a4c](https://github.com/maevsi/maevsi/commit/3499a4c6bdef1feb552b14bb952a61294f83150f))
* **nuxt:** set secret key path ([06ee468](https://github.com/maevsi/maevsi/commit/06ee468c43491758fea37480bfe39e227241763c))
* **package.json:** swap order of pinia and nuxt/turnstile dependencies ([bf41168](https://github.com/maevsi/maevsi/commit/bf41168620716fca6c14f624c97e421e87d71dea))
* **style:** add comments to csp definitions ([17c1e10](https://github.com/maevsi/maevsi/commit/17c1e10324fdade809c24bc930086126417a6830))
* **style:** remove empty line addition ([8229a5e](https://github.com/maevsi/maevsi/commit/8229a5efc7a353a9d9673ac3edfd3cebcd0c2c44))
* **style:** remove margin for turnstile info and err and add gap instead ([4ba5507](https://github.com/maevsi/maevsi/commit/4ba5507bef50c2c9d0c023bb56fc81cc6bcbc6bc))
* **style:** use template syntax for logging of the turnstile key ([97da625](https://github.com/maevsi/maevsi/commit/97da6259c5ee20ee63ebaecd51d3fbad6b361d6d))
* **template:** removes nuxt turnstile secret key from template ([8dbca94](https://github.com/maevsi/maevsi/commit/8dbca94f8a178c7b0618f8d8a42efe21b3a56084))
* **tests:** adds cloudflare turnstile to server test ([1865c55](https://github.com/maevsi/maevsi/commit/1865c55adc4163e7e27eeab25ccece404a977afc))
* **turnstile:** removes unnecessary generation of validation endpoint ([fe542d9](https://github.com/maevsi/maevsi/commit/fe542d9e4ca65ea9c345d7fdfaa1a456dbabb5c7))
* **turnstile:** store turnstile key on [@submit](https://github.com/submit) instead of [@click](https://github.com/click) ([81bd5c8](https://github.com/maevsi/maevsi/commit/81bd5c8f32cab970b96da83249be478bdcfef974))
* **turnstile:** store turnstileKey in variable "form" and not "state" anymore ([9c6f766](https://github.com/maevsi/maevsi/commit/9c6f766554843d707b332c8851f909c7b7c3cd6c))
* **turnstile:** use default site key with invisible widget ([ee9aa79](https://github.com/maevsi/maevsi/commit/ee9aa79cf920d297e6f199d295cbe8ee862a5002))
* **turnstile:** use public runtime configuration for site key ([c46dfd2](https://github.com/maevsi/maevsi/commit/c46dfd2a8c4576168bdab7653d1ed4a2bd2922f3))
* **ui:** removes unnecessary gap ([376854d](https://github.com/maevsi/maevsi/commit/376854debc8f56f4aa48167f3eb29af04c22165a))


### Features

* **auth:** bring .husky back ([da6ffe1](https://github.com/maevsi/maevsi/commit/da6ffe1d98b9302dd331f11540c727353af386c2))
* **auth:** code formatting ([782af37](https://github.com/maevsi/maevsi/commit/782af371dde0fc504f37a2bb852932ee4a8092de))
* **auth:** code reformatting ([9ee4e64](https://github.com/maevsi/maevsi/commit/9ee4e642ff7eb5acb49cecb565bacd2f29ec7f6b))
* **authentication:** add comment according to contribution order ([3bc3827](https://github.com/maevsi/maevsi/commit/3bc38272c45d58674b7b1b3f168f932163ad3c77))
* **authentication:** add missing return statement to error throw ([19925aa](https://github.com/maevsi/maevsi/commit/19925aacf4316da51bc3611cf5d7c5a0ac3e35c7))
* **authentication:** adds google analytics id back to .env ([bafbb1c](https://github.com/maevsi/maevsi/commit/bafbb1c1d063485041780d7cea2f705f22d517ac))
* **authentication:** auto stash before merge ([f5407be](https://github.com/maevsi/maevsi/commit/f5407be5d6dcf0d60692f8c4dd8a15d3a201ead3))
* **authentication:** change headers variable from const  back to let ([609cfe4](https://github.com/maevsi/maevsi/commit/609cfe4d21c617a8404cb15ca17074adea8ade81))
* **authentication:** change node to slim version ([e0f54f4](https://github.com/maevsi/maevsi/commit/e0f54f4e704debfb77709fc3c00e7595235e3ddc))
* **authentication:** change variable name for consistency ([fba917f](https://github.com/maevsi/maevsi/commit/fba917f01506edba19dfa807ef4797aa30409d2c))
* **authentication:** check if not removing the jiti folder fixes build ([85a91bd](https://github.com/maevsi/maevsi/commit/85a91bd516c55b067f05c4b6f01f72d94ddf32d2))
* **authentication:** extracts error commands into an own function ([3641fa3](https://github.com/maevsi/maevsi/commit/3641fa38dde20b431936c0d043caa4a68f37f1ba))
* **authentication:** fixes error throwing in auth proxy ([98a5f2e](https://github.com/maevsi/maevsi/commit/98a5f2e39d5a2c2352818474f506358e905c052b))
* **authentication:** reduce log level of turnstile key logging ([f87737f](https://github.com/maevsi/maevsi/commit/f87737f5e15ccb3cb523de3b69228d736d0ea72d))
* **authentication:** removes disabling of button ([d449646](https://github.com/maevsi/maevsi/commit/d4496465acd5be4765c1f8a087608e73758b7dc3))
* **authentication:** removes double check for undefined turnstile key ([8c84718](https://github.com/maevsi/maevsi/commit/8c847189ecedd6377f73dd9737c2abdb346a03a2))
* **authentication:** removes unnecessary console log ([991ff8f](https://github.com/maevsi/maevsi/commit/991ff8fc680b83a1eef54634914bd81329be2acb))
* **authentication:** removes unnecessary console logs ([6af4a51](https://github.com/maevsi/maevsi/commit/6af4a51913e71cf09158f9f0f0bdac111d028bf5))
* **authentication:** removes unnecessary console output ([f6909cb](https://github.com/maevsi/maevsi/commit/f6909cb474f5e91d7eda9f4450ff3d0a7be7bb3b))
* **authentication:** removes unnecessary emit ([9780aea](https://github.com/maevsi/maevsi/commit/9780aea8ba8287af8f753d60038b611dd93b0a4d))
* **authentication:** removes unnecessary logging output ([a26f062](https://github.com/maevsi/maevsi/commit/a26f0626998513def3f405c19f6f7e77e8547d0a))
* **authentication:** removes unused console log ([66392ce](https://github.com/maevsi/maevsi/commit/66392ceb2448cdda0bc05fe520a3dd2fcaab834f))
* **authentication:** removes unused console log ([1343eb2](https://github.com/maevsi/maevsi/commit/1343eb2a9c2108fc56454677a9849981dfdb9472))
* **authentication:** reverts changes to FormAccountSignIn.vue ([19fad2d](https://github.com/maevsi/maevsi/commit/19fad2d21213e2aaf973c219e7cc3c2bad303b6b))
* **authentication:** separates blocks with blank lines ([92af989](https://github.com/maevsi/maevsi/commit/92af989b166994dc13635d5bfa832f6d9816c71e))
* **authentication:** update nuxt html validator ([6b2ecf6](https://github.com/maevsi/maevsi/commit/6b2ecf68fd840d8a46221c1c9aeb61fb73031b58))
* **authentication:** use gap instead of margin ([c36a074](https://github.com/maevsi/maevsi/commit/c36a0742b02d4365794d386410650a3f76cf38a8))
* **authentication:** uses short variable notation for function ([c033a4d](https://github.com/maevsi/maevsi/commit/c033a4d5252afb45b7f82ada53b76737ed2315b5))
* **authentication:** validate turnstile before submitting form ([b1ffad7](https://github.com/maevsi/maevsi/commit/b1ffad7162b606d8d80bdaae6d2f57173f1d078e))
* **auth:** fix lint problems ([ac4b41a](https://github.com/maevsi/maevsi/commit/ac4b41a4b7f7701ccebd8d3629b493a51dd899f0))
* **auth:** fix turnstile header array ([81a72c7](https://github.com/maevsi/maevsi/commit/81a72c7e3930e9610c45b152e46cbef2568e6d11))
* **captcha:** implement as form input ([b15ed8c](https://github.com/maevsi/maevsi/commit/b15ed8cd5de5dd5b25a919b024e9bc4b17b12e73))
* **form:** add turnstile component ([97ac766](https://github.com/maevsi/maevsi/commit/97ac7664cde64654fb297fee770dd2fb738bebbb))
* stash ([56a1af0](https://github.com/maevsi/maevsi/commit/56a1af0691797d028a3a8ab78cb1fe0bcb6d8d1f))
* **turnstile:** add site key to .env file ([f43e137](https://github.com/maevsi/maevsi/commit/f43e137d24a512b4414cecc1fe74637575df3ae3))
* **turnstile:** adds turnstile to login and verifies key on server ([adc76e2](https://github.com/maevsi/maevsi/commit/adc76e254a5db8c1d634c5e7d13d98f936027a04))
* **turnstile:** edits .env template with new fields ([c348d78](https://github.com/maevsi/maevsi/commit/c348d78f11971f36f4e56f7c19cc4a873b5ce249))
* **turnstile:** let undefined turnstile key pass ([538563d](https://github.com/maevsi/maevsi/commit/538563d923dd9c6f8b2834b063f227039690c285))

# [1.16.0](https://github.com/maevsi/maevsi/compare/1.15.1...1.16.0) (2023-05-11)


### Bug Fixes

* revert "Merge pull request [#1245](https://github.com/maevsi/maevsi/issues/1245) from maevsi/feat/vite-pwa" ([c85ee7d](https://github.com/maevsi/maevsi/commit/c85ee7d10cbd7592b19cb3865d80861743795bdd))


### Features

* **deps:** replace @kevinmarrec/nuxt-pwa with @vite-pwa/nuxt ([436fe63](https://github.com/maevsi/maevsi/commit/436fe638bcb5dbcc1a1fc0689eb61a625d89b45f))
* **pwa:** add install toast ([7a1484c](https://github.com/maevsi/maevsi/commit/7a1484c359dc5a1e979032569333bc44f328796c))
* **pwa:** add manifest ([649a9cc](https://github.com/maevsi/maevsi/commit/649a9cc29b2bde123190663901bf9b46a3d4df4e))


### Performance Improvements

* **pwa:** add all favicons ([1541124](https://github.com/maevsi/maevsi/commit/154112451705261fcb323ef2b8a25f02c48186a4))

## [1.15.1](https://github.com/maevsi/maevsi/compare/1.15.0...1.15.1) (2023-05-10)


### Bug Fixes

* **sqitch:** place not null constraint after type ([63f49df](https://github.com/maevsi/maevsi/commit/63f49dfd2e519227fff5309a804bb94f437bbd73))

# [1.16.0-beta.1](https://github.com/maevsi/maevsi/compare/1.15.1-beta.1...1.16.0-beta.1) (2023-05-10)


### Bug Fixes

* **chore:** fix pnpm-lock ([ea0f269](https://github.com/maevsi/maevsi/commit/ea0f26939288c06b142a8f7d35e6a61739161463))
* **chore:** rearrange imports properly ([05eb798](https://github.com/maevsi/maevsi/commit/05eb798927b8738e971c523ce688d48217319f91))
* **chore:** remove downgrading pinia ([4384806](https://github.com/maevsi/maevsi/commit/4384806fd3a873513e6827774f21db60ed6ec286))
* **chore:** update package json and pnpm lock ([b958d80](https://github.com/maevsi/maevsi/commit/b958d80eae7431d237e3d1a697ae907fb1d1b28e))
* **constants:** use X-Turnstile-Key as header for the turnstile key ([18c43b0](https://github.com/maevsi/maevsi/commit/18c43b05865fcccfcc7bbc740ded5ea84564c7ba))
* **csp:** use correct csp for turnstile ([262dde1](https://github.com/maevsi/maevsi/commit/262dde19daee825648343535f32aabeb6003010a))
* **cypress:** correct csp test ([a209a16](https://github.com/maevsi/maevsi/commit/a209a163c5a47ca68bc4a71972cdcf408b72529d))
* **form-input-captcha:** hide when testing ([1796d3a](https://github.com/maevsi/maevsi/commit/1796d3a228a2df77c1578f2eb75e4ff99ceb4094))
* **form-input-captcha:** let visibility default to true ([fc164e2](https://github.com/maevsi/maevsi/commit/fc164e2f9d36bb1a07d9b3744da5f59584438812))
* **form:** do not use overflow ([3499a4c](https://github.com/maevsi/maevsi/commit/3499a4c6bdef1feb552b14bb952a61294f83150f))
* **nuxt:** set secret key path ([06ee468](https://github.com/maevsi/maevsi/commit/06ee468c43491758fea37480bfe39e227241763c))
* **package.json:** swap order of pinia and nuxt/turnstile dependencies ([bf41168](https://github.com/maevsi/maevsi/commit/bf41168620716fca6c14f624c97e421e87d71dea))
* **style:** add comments to csp definitions ([17c1e10](https://github.com/maevsi/maevsi/commit/17c1e10324fdade809c24bc930086126417a6830))
* **style:** remove empty line addition ([8229a5e](https://github.com/maevsi/maevsi/commit/8229a5efc7a353a9d9673ac3edfd3cebcd0c2c44))
* **style:** remove margin for turnstile info and err and add gap instead ([4ba5507](https://github.com/maevsi/maevsi/commit/4ba5507bef50c2c9d0c023bb56fc81cc6bcbc6bc))
* **style:** use template syntax for logging of the turnstile key ([97da625](https://github.com/maevsi/maevsi/commit/97da6259c5ee20ee63ebaecd51d3fbad6b361d6d))
* **template:** removes nuxt turnstile secret key from template ([8dbca94](https://github.com/maevsi/maevsi/commit/8dbca94f8a178c7b0618f8d8a42efe21b3a56084))
* **tests:** adds cloudflare turnstile to server test ([1865c55](https://github.com/maevsi/maevsi/commit/1865c55adc4163e7e27eeab25ccece404a977afc))
* **turnstile:** removes unnecessary generation of validation endpoint ([fe542d9](https://github.com/maevsi/maevsi/commit/fe542d9e4ca65ea9c345d7fdfaa1a456dbabb5c7))
* **turnstile:** store turnstile key on [@submit](https://github.com/submit) instead of [@click](https://github.com/click) ([81bd5c8](https://github.com/maevsi/maevsi/commit/81bd5c8f32cab970b96da83249be478bdcfef974))
* **turnstile:** store turnstileKey in variable "form" and not "state" anymore ([9c6f766](https://github.com/maevsi/maevsi/commit/9c6f766554843d707b332c8851f909c7b7c3cd6c))
* **turnstile:** use default site key with invisible widget ([ee9aa79](https://github.com/maevsi/maevsi/commit/ee9aa79cf920d297e6f199d295cbe8ee862a5002))
* **turnstile:** use public runtime configuration for site key ([c46dfd2](https://github.com/maevsi/maevsi/commit/c46dfd2a8c4576168bdab7653d1ed4a2bd2922f3))
* **ui:** removes unnecessary gap ([376854d](https://github.com/maevsi/maevsi/commit/376854debc8f56f4aa48167f3eb29af04c22165a))


### Features

* **auth:** bring .husky back ([da6ffe1](https://github.com/maevsi/maevsi/commit/da6ffe1d98b9302dd331f11540c727353af386c2))
* **auth:** code formatting ([782af37](https://github.com/maevsi/maevsi/commit/782af371dde0fc504f37a2bb852932ee4a8092de))
* **auth:** code reformatting ([9ee4e64](https://github.com/maevsi/maevsi/commit/9ee4e642ff7eb5acb49cecb565bacd2f29ec7f6b))
* **authentication:** add comment according to contribution order ([3bc3827](https://github.com/maevsi/maevsi/commit/3bc38272c45d58674b7b1b3f168f932163ad3c77))
* **authentication:** add missing return statement to error throw ([19925aa](https://github.com/maevsi/maevsi/commit/19925aacf4316da51bc3611cf5d7c5a0ac3e35c7))
* **authentication:** adds google analytics id back to .env ([bafbb1c](https://github.com/maevsi/maevsi/commit/bafbb1c1d063485041780d7cea2f705f22d517ac))
* **authentication:** auto stash before merge ([f5407be](https://github.com/maevsi/maevsi/commit/f5407be5d6dcf0d60692f8c4dd8a15d3a201ead3))
* **authentication:** change headers variable from const  back to let ([609cfe4](https://github.com/maevsi/maevsi/commit/609cfe4d21c617a8404cb15ca17074adea8ade81))
* **authentication:** change node to slim version ([e0f54f4](https://github.com/maevsi/maevsi/commit/e0f54f4e704debfb77709fc3c00e7595235e3ddc))
* **authentication:** change variable name for consistency ([fba917f](https://github.com/maevsi/maevsi/commit/fba917f01506edba19dfa807ef4797aa30409d2c))
* **authentication:** check if not removing the jiti folder fixes build ([85a91bd](https://github.com/maevsi/maevsi/commit/85a91bd516c55b067f05c4b6f01f72d94ddf32d2))
* **authentication:** extracts error commands into an own function ([3641fa3](https://github.com/maevsi/maevsi/commit/3641fa38dde20b431936c0d043caa4a68f37f1ba))
* **authentication:** fixes error throwing in auth proxy ([98a5f2e](https://github.com/maevsi/maevsi/commit/98a5f2e39d5a2c2352818474f506358e905c052b))
* **authentication:** reduce log level of turnstile key logging ([f87737f](https://github.com/maevsi/maevsi/commit/f87737f5e15ccb3cb523de3b69228d736d0ea72d))
* **authentication:** removes disabling of button ([d449646](https://github.com/maevsi/maevsi/commit/d4496465acd5be4765c1f8a087608e73758b7dc3))
* **authentication:** removes double check for undefined turnstile key ([8c84718](https://github.com/maevsi/maevsi/commit/8c847189ecedd6377f73dd9737c2abdb346a03a2))
* **authentication:** removes unnecessary console log ([991ff8f](https://github.com/maevsi/maevsi/commit/991ff8fc680b83a1eef54634914bd81329be2acb))
* **authentication:** removes unnecessary console logs ([6af4a51](https://github.com/maevsi/maevsi/commit/6af4a51913e71cf09158f9f0f0bdac111d028bf5))
* **authentication:** removes unnecessary console output ([f6909cb](https://github.com/maevsi/maevsi/commit/f6909cb474f5e91d7eda9f4450ff3d0a7be7bb3b))
* **authentication:** removes unnecessary emit ([9780aea](https://github.com/maevsi/maevsi/commit/9780aea8ba8287af8f753d60038b611dd93b0a4d))
* **authentication:** removes unnecessary logging output ([a26f062](https://github.com/maevsi/maevsi/commit/a26f0626998513def3f405c19f6f7e77e8547d0a))
* **authentication:** removes unused console log ([66392ce](https://github.com/maevsi/maevsi/commit/66392ceb2448cdda0bc05fe520a3dd2fcaab834f))
* **authentication:** removes unused console log ([1343eb2](https://github.com/maevsi/maevsi/commit/1343eb2a9c2108fc56454677a9849981dfdb9472))
* **authentication:** reverts changes to FormAccountSignIn.vue ([19fad2d](https://github.com/maevsi/maevsi/commit/19fad2d21213e2aaf973c219e7cc3c2bad303b6b))
* **authentication:** separates blocks with blank lines ([92af989](https://github.com/maevsi/maevsi/commit/92af989b166994dc13635d5bfa832f6d9816c71e))
* **authentication:** update nuxt html validator ([6b2ecf6](https://github.com/maevsi/maevsi/commit/6b2ecf68fd840d8a46221c1c9aeb61fb73031b58))
* **authentication:** use gap instead of margin ([c36a074](https://github.com/maevsi/maevsi/commit/c36a0742b02d4365794d386410650a3f76cf38a8))
* **authentication:** uses short variable notation for function ([c033a4d](https://github.com/maevsi/maevsi/commit/c033a4d5252afb45b7f82ada53b76737ed2315b5))
* **authentication:** validate turnstile before submitting form ([b1ffad7](https://github.com/maevsi/maevsi/commit/b1ffad7162b606d8d80bdaae6d2f57173f1d078e))
* **auth:** fix lint problems ([ac4b41a](https://github.com/maevsi/maevsi/commit/ac4b41a4b7f7701ccebd8d3629b493a51dd899f0))
* **auth:** fix turnstile header array ([81a72c7](https://github.com/maevsi/maevsi/commit/81a72c7e3930e9610c45b152e46cbef2568e6d11))
* **captcha:** implement as form input ([b15ed8c](https://github.com/maevsi/maevsi/commit/b15ed8cd5de5dd5b25a919b024e9bc4b17b12e73))
* **form:** add turnstile component ([97ac766](https://github.com/maevsi/maevsi/commit/97ac7664cde64654fb297fee770dd2fb738bebbb))
* stash ([56a1af0](https://github.com/maevsi/maevsi/commit/56a1af0691797d028a3a8ab78cb1fe0bcb6d8d1f))
* **turnstile:** add site key to .env file ([f43e137](https://github.com/maevsi/maevsi/commit/f43e137d24a512b4414cecc1fe74637575df3ae3))
* **turnstile:** adds turnstile to login and verifies key on server ([adc76e2](https://github.com/maevsi/maevsi/commit/adc76e254a5db8c1d634c5e7d13d98f936027a04))
* **turnstile:** edits .env template with new fields ([c348d78](https://github.com/maevsi/maevsi/commit/c348d78f11971f36f4e56f7c19cc4a873b5ce249))
* **turnstile:** let undefined turnstile key pass ([538563d](https://github.com/maevsi/maevsi/commit/538563d923dd9c6f8b2834b063f227039690c285))

## [1.15.1-beta.1](https://github.com/maevsi/maevsi/compare/1.15.0...1.15.1-beta.1) (2023-05-10)


### Bug Fixes

* **sqitch:** place not null constraint after type ([63f49df](https://github.com/maevsi/maevsi/commit/63f49dfd2e519227fff5309a804bb94f437bbd73))

# [1.15.0](https://github.com/maevsi/maevsi/compare/1.14.0...1.15.0) (2023-05-08)


### Bug Fixes

* **menu:** remove calendar icon ([0be3c63](https://github.com/maevsi/maevsi/commit/0be3c63d7327add485944c3146a0f4761e8f8403))


### Features

* **constants:** set items per page to 10 ([cb56975](https://github.com/maevsi/maevsi/commit/cb56975376e857491a2593ba1aa7fae27b316574))


### Performance Improvements

* **cookie:** shorten timezone name ([332aae4](https://github.com/maevsi/maevsi/commit/332aae4178433372d66d1fb9dd56fb57e7f4c14c))

# [1.14.0](https://github.com/maevsi/maevsi/compare/1.13.2...1.14.0) (2023-05-05)


### Bug Fixes

* **docker:** correct ignore file ([e271235](https://github.com/maevsi/maevsi/commit/e27123578f58afb508fd4b262a8946683929cabf))
* **icon-container-new:** add block display by default ([0ea69f0](https://github.com/maevsi/maevsi/commit/0ea69f0d4cc54c3a892a1b70a9d2470f819f6778))
* **icon-container:** use span for icons ([9da8d77](https://github.com/maevsi/maevsi/commit/9da8d7738727a563fca22ccb83faed35dbab19c0))
* **image-upload-gallery:** correct button trash margin ([58cb3be](https://github.com/maevsi/maevsi/commit/58cb3be75c3aaf08d53d01c7d88203724d58802c))
* **sqitch:** rework reference constraints ([c4e7a89](https://github.com/maevsi/maevsi/commit/c4e7a8978f3de470d616ee88eb821d2c71137528))


### Features

* **uppy:** display restriction error ([9eecd0b](https://github.com/maevsi/maevsi/commit/9eecd0b50ec4709b1aa795efd3533c8eb5fc5b8a)), closes [#1165](https://github.com/maevsi/maevsi/issues/1165)

# [1.14.0-beta.1](https://github.com/maevsi/maevsi/compare/1.13.2...1.14.0-beta.1) (2023-05-05)


### Bug Fixes

* **docker:** correct ignore file ([e271235](https://github.com/maevsi/maevsi/commit/e27123578f58afb508fd4b262a8946683929cabf))
* **icon-container-new:** add block display by default ([0ea69f0](https://github.com/maevsi/maevsi/commit/0ea69f0d4cc54c3a892a1b70a9d2470f819f6778))
* **icon-container:** use span for icons ([9da8d77](https://github.com/maevsi/maevsi/commit/9da8d7738727a563fca22ccb83faed35dbab19c0))
* **image-upload-gallery:** correct button trash margin ([58cb3be](https://github.com/maevsi/maevsi/commit/58cb3be75c3aaf08d53d01c7d88203724d58802c))


### Features

* **uppy:** display restriction error ([9eecd0b](https://github.com/maevsi/maevsi/commit/9eecd0b50ec4709b1aa795efd3533c8eb5fc5b8a)), closes [#1165](https://github.com/maevsi/maevsi/issues/1165)

## [1.13.2](https://github.com/maevsi/maevsi/compare/1.13.1...1.13.2) (2023-05-01)


### Performance Improvements

* **fonts:** use fontsource ([ed8871e](https://github.com/maevsi/maevsi/commit/ed8871ea8020b4565db620be43c2c5d88c4e6e69)), closes [#1175](https://github.com/maevsi/maevsi/issues/1175)

## [1.13.1](https://github.com/maevsi/maevsi/compare/1.13.0...1.13.1) (2023-04-26)


### Bug Fixes

* **docker:** account for workspace paths ([9afe6b6](https://github.com/maevsi/maevsi/commit/9afe6b6b8828c3217149a7a6a86a57b178f4e84a))

# [1.13.0](https://github.com/maevsi/maevsi/compare/1.12.2...1.13.0) (2023-04-26)


### Bug Fixes

* **event-dashlet-start:** remove icon used for testing ([2d17ccd](https://github.com/maevsi/maevsi/commit/2d17ccd8f088ce6b4737dce4b8c1d2d88b3c85e6))
* **header:** correct sign in button alignment ([422ec30](https://github.com/maevsi/maevsi/commit/422ec30a2df83e5389cc77b2509d5bb91ba6ed8d))


### Features

* **icons:** use tailwind library ([917494d](https://github.com/maevsi/maevsi/commit/917494dba34a17ed196fa996f9b75ac48c73943d)), closes [#1178](https://github.com/maevsi/maevsi/issues/1178)

## [1.12.2](https://github.com/maevsi/maevsi/compare/1.12.1...1.12.2) (2023-04-26)


### Bug Fixes

* **legal:** update address ([cf95732](https://github.com/maevsi/maevsi/commit/cf957325897c09e11c6bfbc8531043ef0cca6c8f))

## [1.12.1](https://github.com/maevsi/maevsi/compare/1.12.0...1.12.1) (2023-04-24)


### Bug Fixes

* **auth:** authenticate anonymously after sign out ([2f8c5d5](https://github.com/maevsi/maevsi/commit/2f8c5d5cfdf31d9af147c2acada13ef3d90dbcb0))
* **auth:** correct authorization for undefined jwt ([47c6c93](https://github.com/maevsi/maevsi/commit/47c6c93775898dcd61a021c296483726bc803ace)), closes [#1188](https://github.com/maevsi/maevsi/issues/1188)

# [1.12.0](https://github.com/maevsi/maevsi/compare/1.11.5...1.12.0) (2023-04-18)


### Bug Fixes

* **form:** correct conditional error display ([83ab4a8](https://github.com/maevsi/maevsi/commit/83ab4a8d4b5b016cde7d2befcc36e31d54a9755f))
* **i18n:** rephrase email verification error ([f6984eb](https://github.com/maevsi/maevsi/commit/f6984ebf62f0cc85a503ef63e70ee511a5cec5ff))


### Features

* **account:** disable verification refreshing ([8a9622c](https://github.com/maevsi/maevsi/commit/8a9622c4abcbaf84138c09e4f3ad982e5a07006c))
* **account:** remove password reset errors ([0f5d7b9](https://github.com/maevsi/maevsi/commit/0f5d7b9f3a9f2c81a7c2f61ca02bb19272775825))

## [1.11.5](https://github.com/maevsi/maevsi/compare/1.11.4...1.11.5) (2023-04-18)


### Bug Fixes

* **account:** correct graphql error message getter ([70141a6](https://github.com/maevsi/maevsi/commit/70141a6d546d7b0396f1c72ee240aec489b06a51))
* **account:** run email verification on client only ([8288e62](https://github.com/maevsi/maevsi/commit/8288e622b46a3a02371da2f4b7dc0104bd58faf0))
* **cypress:** save diff images only when necessary ([805a105](https://github.com/maevsi/maevsi/commit/805a105497f3204e721bac5299f96efc9e8d29b0))
* **docker:** install curl for cypress ([51d2367](https://github.com/maevsi/maevsi/commit/51d236783d73bdc4fdb2645f1687bcef947fc8ec))

## [1.11.4](https://github.com/maevsi/maevsi/compare/1.11.3...1.11.4) (2023-04-18)


### Bug Fixes

* **form-input-username:** correct existence check ([ffb3996](https://github.com/maevsi/maevsi/commit/ffb3996194954f7d5a1ed6b1c0e33ca68f7ac490)), closes [#938](https://github.com/maevsi/maevsi/issues/938)

## [1.11.3](https://github.com/maevsi/maevsi/compare/1.11.2...1.11.3) (2023-04-18)


### Bug Fixes

* **form-event:** add missing form input state error for start ([0c92437](https://github.com/maevsi/maevsi/commit/0c92437e530e0aec72738824d30500905ce85030)), closes [#1169](https://github.com/maevsi/maevsi/issues/1169)

## [1.11.2](https://github.com/maevsi/maevsi/compare/1.11.1...1.11.2) (2023-04-18)


### Bug Fixes

* **i18n:** disable missing warning ([e22b682](https://github.com/maevsi/maevsi/commit/e22b68213d75083c24dd6ac6e889e8d513406850))

## [1.11.1](https://github.com/maevsi/maevsi/compare/1.11.0...1.11.1) (2023-04-17)


### Bug Fixes

* **loader-image:** watch source ([1ee166a](https://github.com/maevsi/maevsi/commit/1ee166ab7ef977ac196ffec6f5450e4de1879180)), closes [#1168](https://github.com/maevsi/maevsi/issues/1168)

# [1.11.0](https://github.com/maevsi/maevsi/compare/1.10.1...1.11.0) (2023-04-13)


### Bug Fixes

* **analytics:** correct csp ([47dbea9](https://github.com/maevsi/maevsi/commit/47dbea91d42e8d459501831c00ab7ed4ad6e4354))
* correct truncation ([5a1c53b](https://github.com/maevsi/maevsi/commit/5a1c53b7816e36aa079ff4b19fef1a78d72463db))
* **dropdown:** allow scroll on unmount ([6cf1159](https://github.com/maevsi/maevsi/commit/6cf1159b3ee2f037c43a2b5c0add4b6a416c3b81)), closes [#1173](https://github.com/maevsi/maevsi/issues/1173)
* **form-input-state-info:** add missing title property ([925c8c1](https://github.com/maevsi/maevsi/commit/925c8c13965f4733264921b610ee53140efe6864))
* **invitation-list:** correct chart label colors ([e738323](https://github.com/maevsi/maevsi/commit/e738323d3b2c1bb0ac60e9c916ed23f3bbd9abe7))


### Features

* **css:** rework overflow ([f6c1c0d](https://github.com/maevsi/maevsi/commit/f6c1c0ddb177e7e41370e8284b7864311bed826e))
* **font:** use single manrope file ([c02fc06](https://github.com/maevsi/maevsi/commit/c02fc06af303c2f000976cb627eaccbd4fd06262))

## [1.10.1](https://github.com/maevsi/maevsi/compare/1.10.0...1.10.1) (2023-04-13)


### Bug Fixes

* **validation:** correct event existence variables ([21163cf](https://github.com/maevsi/maevsi/commit/21163cfd883cf8cfbe5230f5075df3673fb7476e)), closes [#1014](https://github.com/maevsi/maevsi/issues/1014)

# [1.10.0](https://github.com/maevsi/maevsi/compare/1.9.5...1.10.0) (2023-04-05)


### Bug Fixes

* **🫖:** use ssr context ([cbf41a8](https://github.com/maevsi/maevsi/commit/cbf41a874f7b486a58d8ac5dddad306cc672d3cf))
* **deps:** downgrade urql ([8686657](https://github.com/maevsi/maevsi/commit/86866573d05b0a38cc66aa52d8db7f0b9b5fbce3))
* **urql:** account for undefined decoding ([a36a039](https://github.com/maevsi/maevsi/commit/a36a0396b05fd3dbce6d6044c12163aeb986fe79))
* **validation:** correct gql client ([6e3cf1f](https://github.com/maevsi/maevsi/commit/6e3cf1f6fd893a3fc4c20c150ff6d8cfacfb9bc7))


### Features

* **gql:** use client preset ([36fc8dc](https://github.com/maevsi/maevsi/commit/36fc8dc18e1a1d49ab0a15d13f3a64cde1b23361))

## [1.9.5](https://github.com/maevsi/maevsi/compare/1.9.4...1.9.5) (2023-04-05)


### Bug Fixes

* **tusd:** save full upload id ([66bb4ea](https://github.com/maevsi/maevsi/commit/66bb4ea5851f9cef5300a8535ec8ecbeca94488e))
* **tusd:** workaround image url suffix ([250a97a](https://github.com/maevsi/maevsi/commit/250a97a32b45bf80eb99ba2d04da320fcdaaf798)), closes [#1140](https://github.com/maevsi/maevsi/issues/1140)

## [1.9.4](https://github.com/maevsi/maevsi/compare/1.9.3...1.9.4) (2023-03-22)


### Bug Fixes

* **cypress:** reenable upload test ([789ed22](https://github.com/maevsi/maevsi/commit/789ed227d3bda0c2e057469e775a26043264e0e4))

## [1.9.3](https://github.com/maevsi/maevsi/compare/1.9.2...1.9.3) (2023-03-18)


### Bug Fixes

* **release:** schedule release ([afa421a](https://github.com/maevsi/maevsi/commit/afa421afb6b37442658da4097a4790d742115d58))

## [1.9.2](https://github.com/maevsi/maevsi/compare/1.9.1...1.9.2) (2023-03-10)


### Bug Fixes

* **docker:** install dependencies in cypress stage ([47f2f45](https://github.com/maevsi/maevsi/commit/47f2f459dd17e7177c02743151d6be9de5f07b03))

## [1.9.1](https://github.com/maevsi/maevsi/compare/1.9.0...1.9.1) (2023-02-28)


### Bug Fixes

* **vitest:** do not watch in docker ([c889dde](https://github.com/maevsi/maevsi/commit/c889ddef4de302492cf90e8139345bcac48245a0))

# [1.9.0](https://github.com/maevsi/maevsi/compare/1.8.0...1.9.0) (2023-02-27)


### Features

* **cookie-control:** set links and shorten ids ([4b627b4](https://github.com/maevsi/maevsi/commit/4b627b49f37c0ccaed377c07ca0fbf6a7bdf9d2b))

# [1.8.0](https://github.com/maevsi/maevsi/compare/1.7.1...1.8.0) (2023-02-27)


### Bug Fixes

* **docker:** use cypress installed as dependency ([b4e0e0f](https://github.com/maevsi/maevsi/commit/b4e0e0f1847831ff39aac07f133b87b030dd806a))


### Features

* **sql:** use native uuid v4 generation ([c4bf7cc](https://github.com/maevsi/maevsi/commit/c4bf7cc1db7fcb686a31484b67ece7dba1122daa)), closes [#1089](https://github.com/maevsi/maevsi/issues/1089)


### Performance Improvements

* **docker:** run cypress in parallel ([3e98f32](https://github.com/maevsi/maevsi/commit/3e98f32d1b51609ddea9a3530d54d3a6514640f0))

## [1.7.1](https://github.com/maevsi/maevsi/compare/1.7.0...1.7.1) (2023-02-25)


### Bug Fixes

* **release:** schedule release ([27956a3](https://github.com/maevsi/maevsi/commit/27956a32eb2e05552801808c7a111e3a2f9cafb0))

# [1.7.0](https://github.com/maevsi/maevsi/compare/1.6.0...1.7.0) (2023-02-13)


### Bug Fixes

* **csp:** enable xss protection header ([84528fb](https://github.com/maevsi/maevsi/commit/84528fb20440bc252fd71379e3033436ecada1c8))
* **cypress:** correct entrypoint for v12.4 ([03280db](https://github.com/maevsi/maevsi/commit/03280db1b7d0625e46c36064982169f9be2a5e63))
* **headers:** set hsts only for production ([7c79cba](https://github.com/maevsi/maevsi/commit/7c79cba44442bb002d52f3178dd80ad7875e4000))
* **i18n:** correct public source naming ([d27deb0](https://github.com/maevsi/maevsi/commit/d27deb0240e9164bd171bbabd76979048839f6a3))
* **icon-container:** correct title validity ([d615b3c](https://github.com/maevsi/maevsi/commit/d615b3c13319a136322a202d78a4e1284bd95d02))
* **nuxt:** remove shim disabling ([75ceb1a](https://github.com/maevsi/maevsi/commit/75ceb1a0cec30ec5b488861dc179dd587e698bbf))
* **release:** schedule release ([a11d740](https://github.com/maevsi/maevsi/commit/a11d740d3e50b6ef9f8a8c7e7d7fa91d2100265d))
* **release:** schedule release ([08a0922](https://github.com/maevsi/maevsi/commit/08a0922e346d43f8c4954f467680a5532e16f755))


### Features

* **cookie:** reenable own cookies' descriptions ([120e893](https://github.com/maevsi/maevsi/commit/120e893d229bf5311ddf688cb3c0bcf4c6d0820e))


### Reverts

* Revert "ci(upload): disable image upload gallery temporarily" ([9bb3179](https://github.com/maevsi/maevsi/commit/9bb3179838adcaf754741855bf346d35514936ca))

# [1.6.0](https://github.com/maevsi/maevsi/compare/1.5.0...1.6.0) (2023-01-20)


### Bug Fixes

* **cookie-control:** correct locale string ([a815fd0](https://github.com/maevsi/maevsi/commit/a815fd04eb1e73eea94e99064eaf0a951dc5000d))
* **nuxt:** correct dayjs destructuring ([080019b](https://github.com/maevsi/maevsi/commit/080019bd6a927d405c29686536b4ad9bdb37d925))
* **util:** correct ip header ([ddc4cb6](https://github.com/maevsi/maevsi/commit/ddc4cb6ec1cd4e14ac233338e9897b088261babe))


### Features

* **ssr:** account for timezone ([57a9ebf](https://github.com/maevsi/maevsi/commit/57a9ebfc15e3c70f2725f4533215a406c3a057a7)), closes [#999](https://github.com/maevsi/maevsi/issues/999)

# [1.5.0](https://github.com/maevsi/maevsi/compare/1.4.0...1.5.0) (2023-01-19)


### Features

* **cookie-control:** upgrade to v4 ([5e048f2](https://github.com/maevsi/maevsi/commit/5e048f2a4d90135dd21ce286588b7b725e3c79e5)), closes [#1042](https://github.com/maevsi/maevsi/issues/1042)

# [1.4.0](https://github.com/maevsi/maevsi/compare/1.3.5...1.4.0) (2023-01-17)


### Features

* **cookie-control:** set checkbox active background color ([64ed54c](https://github.com/maevsi/maevsi/commit/64ed54cbc749cc19a9135ae5165da6eb03924493))

## [1.3.5](https://github.com/maevsi/maevsi/compare/1.3.4...1.3.5) (2023-01-17)


### Bug Fixes

* **image-upload-gallery:** correct upload quota calculation ([682b357](https://github.com/maevsi/maevsi/commit/682b3573c2fa54256d8d372e5d8974ff73e87c08)), closes [#1037](https://github.com/maevsi/maevsi/issues/1037)

## [1.3.4](https://github.com/maevsi/maevsi/compare/1.3.3...1.3.4) (2023-01-16)


### Bug Fixes

* **cookie-control:** correct page placement ([0f4a13b](https://github.com/maevsi/maevsi/commit/0f4a13bd131e64da0bb0af28fa1a12233a472d2c))

## [1.3.3](https://github.com/maevsi/maevsi/compare/1.3.2...1.3.3) (2023-01-14)


### Bug Fixes

* **cypress:** correct cookie handling ([dbf9a1a](https://github.com/maevsi/maevsi/commit/dbf9a1a354e4d15325a0ef4433fc1756e08b41b1))
* **cypress:** correct cookie name ([eda243c](https://github.com/maevsi/maevsi/commit/eda243c7f299cfe810001849dafe0b10af158114))
* **gtag:** convert undefined to boolean ([49c1413](https://github.com/maevsi/maevsi/commit/49c141369495fd89f731d90bd992317673df2a71))

## [1.3.2](https://github.com/maevsi/maevsi/compare/1.3.1...1.3.2) (2023-01-13)


### Bug Fixes

* **release:** schedule release ([82b2011](https://github.com/maevsi/maevsi/commit/82b20113b9c8668ba7e31c08473b38f9627b24e7))


### Reverts

* Revert "fix(nuxt): temporarily enable sourcemaps" ([bcbc0a0](https://github.com/maevsi/maevsi/commit/bcbc0a0eb4278c4f6db3b7eb7397a61b2bb6bbf7))

## [1.3.1](https://github.com/maevsi/maevsi/compare/1.3.0...1.3.1) (2023-01-13)


### Bug Fixes

* **nuxt:** temporarily enable sourcemaps ([e77c979](https://github.com/maevsi/maevsi/commit/e77c9793675748be30f7d4e6068003293adcc6b9))

# [1.3.0](https://github.com/maevsi/maevsi/compare/1.2.1...1.3.0) (2023-01-12)


### Features

* **invitation:** move feedback buttons, disable paper card feedback ([679db97](https://github.com/maevsi/maevsi/commit/679db9713a0d793c314273540fd395aaa201253f))

## [1.2.1](https://github.com/maevsi/maevsi/compare/1.2.0...1.2.1) (2023-01-12)


### Bug Fixes

* **index:** correct spelling ([e9840b5](https://github.com/maevsi/maevsi/commit/e9840b5c8af35bab78b2cf6e7971f048e7e15306))

# [1.2.0](https://github.com/maevsi/maevsi/compare/1.1.3...1.2.0) (2023-01-10)


### Bug Fixes

* **toast:** do not await ([4331042](https://github.com/maevsi/maevsi/commit/433104270162f6f3e004c36ae8bf1a2c564fe397)), closes [#1012](https://github.com/maevsi/maevsi/issues/1012)


### Features

* **toast:** display centered ([fd5b7ac](https://github.com/maevsi/maevsi/commit/fd5b7ac964ccf54131ad50f536f57d19a83dd339))

## [1.1.3](https://github.com/maevsi/maevsi/compare/1.1.2...1.1.3) (2023-01-10)


### Bug Fixes

* **auth:** use secure cookie only in production ([af28b87](https://github.com/maevsi/maevsi/commit/af28b87958a8db8dee6a95a3c8941811984fe46c))
* **browser-support:** disable header for testing ([278b809](https://github.com/maevsi/maevsi/commit/278b809f7f5f0bc7994765901baa474f233d9699))
* **cropper-overflow:** adds max height for cropper component ([1c112cd](https://github.com/maevsi/maevsi/commit/1c112cd64f5a94951f456e59a0ec095dadb4cd0a))
* **cropper:** correct stretcher algorithm ([8f09979](https://github.com/maevsi/maevsi/commit/8f09979c22834396ac91390ff7eaaa3f8fd17289))
* **image-upload-gallery:** simplify class usage ([7a1dc01](https://github.com/maevsi/maevsi/commit/7a1dc011d656b85579e4312b453fde7dc382cb58))
* **imge-upload-gallery:** correct button margin ([7246fde](https://github.com/maevsi/maevsi/commit/7246fdee62438fb22eb1ae00f8704e2db2330ce0)), closes [#985](https://github.com/maevsi/maevsi/issues/985)

## [1.1.2](https://github.com/maevsi/maevsi/compare/1.1.1...1.1.2) (2023-01-07)


### Bug Fixes

* **env:** correct template ([7c5f07a](https://github.com/maevsi/maevsi/commit/7c5f07addab1753d1ba64775e3fe8e75c0162a1e))
* **favicon:** move to public root ([88a671e](https://github.com/maevsi/maevsi/commit/88a671ed8b127351337726d548aba5350ca7671e))
* **manifest:** use only pwa generated one ([4a460d8](https://github.com/maevsi/maevsi/commit/4a460d89d1bf5674aaeb621da766b1d365d405c0))

## [1.1.1](https://github.com/maevsi/maevsi/compare/1.1.0...1.1.1) (2023-01-06)


### Bug Fixes

* **nuxt:** correct public runtime configuration ([7d21cc1](https://github.com/maevsi/maevsi/commit/7d21cc1d579dfaae849449215572ac224ae88e13))

# [1.1.0](https://github.com/maevsi/maevsi/compare/1.0.2...1.1.0) (2023-01-06)


### Features

* add gtag ([0006e5d](https://github.com/maevsi/maevsi/commit/0006e5dfb2214045a8aa579816849d2b03d61a32)), closes [#950](https://github.com/maevsi/maevsi/issues/950)

## [1.0.2](https://github.com/maevsi/maevsi/compare/1.0.1...1.0.2) (2023-01-02)


### Bug Fixes

* **cypress:** use testing timestamp ([a95df3e](https://github.com/maevsi/maevsi/commit/a95df3e0cc22cd980c8d526062c13ae1c4ed912d))
* **release:** schedule release ([ef0177d](https://github.com/maevsi/maevsi/commit/ef0177d7d9fa357e140f8c6d8b20abad6de5b8be))

## [1.0.1](https://github.com/maevsi/maevsi/compare/1.0.0...1.0.1) (2022-12-21)


### Bug Fixes

* **cypress:** correct duplicate snapshot test ([9ff1cf1](https://github.com/maevsi/maevsi/commit/9ff1cf1da2b16a2ccf57f299a670dc88e0e8cfe2))

# [1.0.0](https://github.com/maevsi/maevsi/compare/0.147.0...1.0.0) (2022-12-15)


### Bug Fixes

* **api:** add missing import ([f58cbd0](https://github.com/maevsi/maevsi/commit/f58cbd0ea6c8e5271dbfb65ec78e46f24f6ff207))
* **api:** correct host getter ([5e06db7](https://github.com/maevsi/maevsi/commit/5e06db772d4bd51ed843cd2eba28790a9a8d73d3))
* **api:** correct pagination ([3e5f0cf](https://github.com/maevsi/maevsi/commit/3e5f0cf5483442ed6ee10d271722826bf6a06070))
* **api:** reset errors ([eee44c8](https://github.com/maevsi/maevsi/commit/eee44c853b99387cf4a8fa3baec2286d11d0f24d))
* **app:** correct nuxt 3 link ([7184776](https://github.com/maevsi/maevsi/commit/718477662e9d285becba5e46cb57a30b8f94c1a8))
* **attendance:** enable qr-code-stream ([b8e9bc2](https://github.com/maevsi/maevsi/commit/b8e9bc23a2f5903c4ddf472a42eef5c457835237))
* **auth:** disable jwt validation for development against staging ([d030af4](https://github.com/maevsi/maevsi/commit/d030af4b274a88edb02a549da5b6f643c851c84f))
* **breadcrumb:** fixed routing in breadcrumbs ([93ab582](https://github.com/maevsi/maevsi/commit/93ab5820419f319c5aa6633370df48802f9b472d))
* **breadcrumbs:** migrate append property to function ([e4ea575](https://github.com/maevsi/maevsi/commit/e4ea57596d6468dfb17b5516e790bb61ab861bb9))
* **card:** remove duplicate class name ([37769f6](https://github.com/maevsi/maevsi/commit/37769f69ab89ae2e27f65745e4f275582d6a4102))
* **chart:** update to v4 ([70c258f](https://github.com/maevsi/maevsi/commit/70c258fd47c0a40214b0724e3dab5d2e273c4ec9))
* **color-mode:** temporarily disable selection ([27fc2be](https://github.com/maevsi/maevsi/commit/27fc2be6a25fdff5580aa8aedc9a10230c2b0a34))
* **commitlint:** allow long body lines on CI ([bbb1f0b](https://github.com/maevsi/maevsi/commit/bbb1f0b887193ae0b3deca2cdc2bab7de01203d3))
* **commitlint:** extend maximum line length rule to footer ([fb767c8](https://github.com/maevsi/maevsi/commit/fb767c880c3ca779bc04787bdf656b47035579f2))
* **components:** migrate v-model usage ([67f9451](https://github.com/maevsi/maevsi/commit/67f9451b20a2094c3443ebbaf042f276d6f8e93a))
* **components:** resolve html validation errors ([0820d1b](https://github.com/maevsi/maevsi/commit/0820d1b294d7bc050cffe080426b2ccf55c00f16))
* **composable:** support computed ref in head ([7d1f076](https://github.com/maevsi/maevsi/commit/7d1f076aad6b7ecabf7fbbbdf86b284e01b071a7)), closes [#898](https://github.com/maevsi/maevsi/issues/898)
* compute data where required ([daf0e0e](https://github.com/maevsi/maevsi/commit/daf0e0e6fb0af5929371fc426e0e8048b7972b99))
* **consola:** correct log level ([1f72020](https://github.com/maevsi/maevsi/commit/1f72020c3c6ec3ab1fa6cc807dfa418c6038a6ea))
* **contact-avatar:** revert size property change ([d502d17](https://github.com/maevsi/maevsi/commit/d502d17c3a8391d6b22d800120eca92142049e68))
* **contact:** correctly finish deletions ([a6867ff](https://github.com/maevsi/maevsi/commit/a6867ff5f201f12bc9f52b4f13dfc14692606933))
* **contact:** delete by id ([889380b](https://github.com/maevsi/maevsi/commit/889380b277c26b275f1c462d82015ef23c77097a))
* **css:** add margin to links and buttons with rings ([0a77fe0](https://github.com/maevsi/maevsi/commit/0a77fe03ac3702edc180f645849d8f36cd984206))
* **cypress:** correct server test ([2016eb9](https://github.com/maevsi/maevsi/commit/2016eb930166141f47daff5d0b13349b2159faa8))
* **cypress:** properly account for cookie banner ([3deb1d8](https://github.com/maevsi/maevsi/commit/3deb1d8f2077b6a13fb56e6b9b2911aea43ea405))
* **cypress:** wait for control button to be visible ([f598fb1](https://github.com/maevsi/maevsi/commit/f598fb12b37d51c05b63d35ae2e5c8ed3f68aebf))
* **dayjs:** workaround ssr issue ([da03164](https://github.com/maevsi/maevsi/commit/da03164318f22acaa68d46a2a4fcd3e18e135092)), closes [#956](https://github.com/maevsi/maevsi/issues/956)
* **docker:** correct e2e path ([677e01f](https://github.com/maevsi/maevsi/commit/677e01f9dad03746a19d3f6e7eaadf5c262531f2))
* **docker:** correct e2e tests ([d4e74a5](https://github.com/maevsi/maevsi/commit/d4e74a51edf8948b222f8a7684de9a3e6d192df4))
* **docker:** reenable test ([4891376](https://github.com/maevsi/maevsi/commit/48913762ba2f0f18baee54e43f7ff1bc6f092f77))
* **docker:** run integration tests consecutively ([983bad3](https://github.com/maevsi/maevsi/commit/983bad3f8714533c95a6106c225573562a65294a))
* **docker:** set user in build ([e4ff034](https://github.com/maevsi/maevsi/commit/e4ff0348c9128f2bdcb6e850c31c9fcc339ee8a5))
* **dropdown:** increase sizes ([b9af37c](https://github.com/maevsi/maevsi/commit/b9af37cf95d30fd2e5e7e9aa0a445e0833877b74))
* **error:** add missing layout ([b7eb034](https://github.com/maevsi/maevsi/commit/b7eb034d80dda52940348e9e99e648d0e846bbc2))
* **event-list:** correct markup ([46f8755](https://github.com/maevsi/maevsi/commit/46f8755ea8e52e795c0184b2719d0b4cddfc48d4))
* **event-settings:** correct breadcrumb text ([4555ed5](https://github.com/maevsi/maevsi/commit/4555ed5743ba432b5c4fbb308f06288a2dbc7e8c))
* **event-unlock:** correct redirects ([dfc8778](https://github.com/maevsi/maevsi/commit/dfc8778e28a4a879f42c0f4abdabe027f5e2c0c3))
* **event-unlock:** downgrade nuxt ([97a90c2](https://github.com/maevsi/maevsi/commit/97a90c21c56aa78486aeeed95a3cafdc00d2a9d5))
* **event-unlock:** reactivate layout ([b155dd6](https://github.com/maevsi/maevsi/commit/b155dd641ff3d651d7ba24361062d84d2978b817))
* **event-unlock:** temporarily disable canvas layout ([3fa36cb](https://github.com/maevsi/maevsi/commit/3fa36cbb18f8acdf35c27b154dd72f9f7264e944))
* **event:** allow to clear maximum invitee count ([d045790](https://github.com/maevsi/maevsi/commit/d045790b97761b0e6ae718ec02f113fc64ace308))
* **event:** correct deletion parameters ([aa4e2f4](https://github.com/maevsi/maevsi/commit/aa4e2f4f1c8324bd4e2f42fdfa4f9cc467152c82))
* **event:** correct ical api request ([db3dcdb](https://github.com/maevsi/maevsi/commit/db3dcdbe11fa5ce8bc0bd1127b617facf9fead10))
* **event:** correct page validation ([2f4e360](https://github.com/maevsi/maevsi/commit/2f4e360a1d209958f90f92851c006ff045423005))
* **event:** improve heading responsiveness ([8dcc67e](https://github.com/maevsi/maevsi/commit/8dcc67e2055cdf19f3b95c37d21e8a7f40b01c8b))
* **event:** increase maximum description length ([1af732f](https://github.com/maevsi/maevsi/commit/1af732fe14ef09c00b44a712e8185566f0ca4d3b))
* **event:** readd missing required property ([1bcee49](https://github.com/maevsi/maevsi/commit/1bcee49075d707891a0fff6c4e4befb9771fa5e4))
* **event:** replace world icon with eye icon ([28785d5](https://github.com/maevsi/maevsi/commit/28785d5d507e952f298718f26076924cfc2027fb)), closes [#905](https://github.com/maevsi/maevsi/issues/905)
* **event:** restore link behavior ([bc8c9e9](https://github.com/maevsi/maevsi/commit/bc8c9e9cc43a1afe4b6a825f8699d5965669a745))
* **event:** type events ([54305ae](https://github.com/maevsi/maevsi/commit/54305ae5633bfd02191ba5326c6011628b4c9937))
* **event:** use correct route variable ([59ee3c5](https://github.com/maevsi/maevsi/commit/59ee3c5a3fa75e5c6b564bb3daff1ad38866d49c))
* **footer:** add gap ([57a7798](https://github.com/maevsi/maevsi/commit/57a7798a1ddfabfa2d54b9e060f5c0acbc8c45c0))
* **form-account-sign-in:** correct conditional slot ([50ba444](https://github.com/maevsi/maevsi/commit/50ba444d476bbee06147c13414854358ba8d2fc8))
* **form-contact:** close on saved edit ([8c0fe69](https://github.com/maevsi/maevsi/commit/8c0fe6935b5b0d0b0e6da33991c602715b3a1263)), closes [#939](https://github.com/maevsi/maevsi/issues/939)
* **form:** correct api data reactivity ([91fec6e](https://github.com/maevsi/maevsi/commit/91fec6e1a91c4fbe9de19f192bf0d6a65068051b))
* **form:** correct card height ([309a248](https://github.com/maevsi/maevsi/commit/309a2487e60822dd03ab96a968266fbb733fa6d3))
* **form:** correct error border radius ([887b44d](https://github.com/maevsi/maevsi/commit/887b44d45f7ac21cb422dfafd20fa9193501b041))
* **form:** correct typing ([2bc5db5](https://github.com/maevsi/maevsi/commit/2bc5db5b7bab107f75701176601008567d4f1e89))
* **form:** correct vuelidate properties ([cbbdfb8](https://github.com/maevsi/maevsi/commit/cbbdfb8c4c3d6db312448cffb66a7e67b54a8059))
* **form:** set form instead of model ([80c9af4](https://github.com/maevsi/maevsi/commit/80c9af4a9b8dc2463639bfcb46adcd9661162f58))
* **form:** simplify form extraction ([5bf809b](https://github.com/maevsi/maevsi/commit/5bf809b7d07bc372651319cc87a386bf8c7a06ce))
* **form:** use form validation instead of null checks ([7f00d8b](https://github.com/maevsi/maevsi/commit/7f00d8b0fc186f3b98f28fb011ce864af987351d))
* **form:** use vuelidate setter ([4d6894d](https://github.com/maevsi/maevsi/commit/4d6894dfa4cb05317713a31423b10bd856b2564c))
* **form:** watch properties ([ff3762f](https://github.com/maevsi/maevsi/commit/ff3762f9de604a70e7c94eb50c7c0de5f2ef3117)), closes [#834](https://github.com/maevsi/maevsi/issues/834)
* **gql:** add null typing ([769f8fc](https://github.com/maevsi/maevsi/commit/769f8fc8600b07a9efc1714e074b3f7f39ab43fa)), closes [#834](https://github.com/maevsi/maevsi/issues/834)
* **gql:** disable unauthorized tls rejection ([2d421a5](https://github.com/maevsi/maevsi/commit/2d421a5f5aa4bd0fcdcd6ecf5f7aa2fb6627ec15))
* **h3:** revert upgrade ([fb6e5d7](https://github.com/maevsi/maevsi/commit/fb6e5d7bf744e943f467f7f473ad7d525296d96d))
* **header:** compute store property ([393a628](https://github.com/maevsi/maevsi/commit/393a628608e81911df12ee5802c29bffc5487aba))
* **headers:** fix network error "blocked" when uploading a picture ([e10a4ad](https://github.com/maevsi/maevsi/commit/e10a4ad0b21466283b98e58a42066c60a676725b))
* **head:** temporarily move body styling to css ([cb6c351](https://github.com/maevsi/maevsi/commit/cb6c35152d301126585ebd4e39374de33a330594))
* **i18n:** add missing tags ([ba64bc8](https://github.com/maevsi/maevsi/commit/ba64bc893958b747eb0ece09477eb0c43f41928d))
* **i18n:** migrate fallback warning ([47ab45a](https://github.com/maevsi/maevsi/commit/47ab45a6b4efefd8fe2ba76e3dd3af051684db83))
* **i18n:** use all rules ([b3e167d](https://github.com/maevsi/maevsi/commit/b3e167d48a9b91996a602765d4a86755deb52fd4))
* **ical:** remove unnecessary parameter validation ([07b0ca8](https://github.com/maevsi/maevsi/commit/07b0ca8bd8d96fed1982a55b723ee98eb733af81))
* **icon-flag-united-kingdom:** correct translation ([dda0930](https://github.com/maevsi/maevsi/commit/dda0930061891d3a6f2e48b734789128290c1855))
* **icon:** correct container name ([4765012](https://github.com/maevsi/maevsi/commit/4765012ca583348f7f9d279d9aae545d2cbe16cc))
* **image-upload-gallery:** correct conditional display ([693ec6c](https://github.com/maevsi/maevsi/commit/693ec6cf39099bdf04d60102ae63631896ddf302))
* **image-upload-gallery:** redirect to uploads temporarily ([2a29f83](https://github.com/maevsi/maevsi/commit/2a29f833d415fe9338f0234b7c33c72d40be8d2d)), closes [#760](https://github.com/maevsi/maevsi/issues/760)
* **image-upload-gallery:** resolve jwt ref ([b46d0ff](https://github.com/maevsi/maevsi/commit/b46d0ffacfc0818f7257c3a38710ee57a6764998))
* **image:** correct display ([cf4bef3](https://github.com/maevsi/maevsi/commit/cf4bef3154bff0493afc1a3a0e70508a6827c3fb))
* **index:** correct image width ([ef12206](https://github.com/maevsi/maevsi/commit/ef122063c7d9a6bc645860a809363737b3cdaa14))
* **invitation-form:** improve ux ([84d607b](https://github.com/maevsi/maevsi/commit/84d607b2c8fb8fd04741ec52a62ccabccd55dc3f))
* **invitation-list:** correct chart update function ([47e8f21](https://github.com/maevsi/maevsi/commit/47e8f215c8a3b357e1fd335aac99e6aa974ad569))
* **invitation-list:** correct client check ([b9f0173](https://github.com/maevsi/maevsi/commit/b9f0173b53ad8a2e1d3c306bf7836ce96e8bae23))
* **invitations:** enable relay pagination ([76c20a6](https://github.com/maevsi/maevsi/commit/76c20a641834e082312f5d94e6e3532fb6649f4e))
* **jest:** add module mapping ([0814fd9](https://github.com/maevsi/maevsi/commit/0814fd9816d3a08e8b246e5a52d0a4093e44647d))
* **layout-footer:** reenable color mode selection ([3669673](https://github.com/maevsi/maevsi/commit/36696734041537ce152d213993965f34264f0fe2)), closes [#926](https://github.com/maevsi/maevsi/issues/926)
* **layout-header:** correct display ([9a79354](https://github.com/maevsi/maevsi/commit/9a7935490776b01e2d6ac9633297ffd00b7bd0e4))
* **layout:** correct footer offset ([0dda770](https://github.com/maevsi/maevsi/commit/0dda770451f068bdc027a9386790fc4df323c7f9))
* **layout:** initialize color scheme selection on client only ([1a42286](https://github.com/maevsi/maevsi/commit/1a422865891b58c65e7083b4a80a7e37fe6e6d90))
* **list:** add missing padding ([4568537](https://github.com/maevsi/maevsi/commit/456853724dd910a0b578afe700dd5e778e5fac3c))
* **loader-image:** correct state update placement ([28dffcc](https://github.com/maevsi/maevsi/commit/28dffccd7937e315ebfa1cdb6686f32a2af10aaa))
* **loader-image:** set aspect ratio ([72d70d9](https://github.com/maevsi/maevsi/commit/72d70d93aefae41a9c00a481ff69d78ddbd92f19))
* **loader-image:** use classes ([63a27d9](https://github.com/maevsi/maevsi/commit/63a27d910088324aa90ce021b350f300a22da3a2))
* **loader-indicator:** correct display behavior ([89ad270](https://github.com/maevsi/maevsi/commit/89ad2705007406dfe487feacea118921926f2d99))
* **loader:** correct property requirements ([bf02d66](https://github.com/maevsi/maevsi/commit/bf02d6689152e5125b494cd7551e4d1b551637eb))
* **loader:** correct size ([7b70cf1](https://github.com/maevsi/maevsi/commit/7b70cf17819113345345a99b13e5e04c3a3ff83f))
* **locales:** remove exclamation mark from title ([735cc22](https://github.com/maevsi/maevsi/commit/735cc22258bd70fda0fe36716bcdbe241044c68d))
* make api reactive ([d913c9a](https://github.com/maevsi/maevsi/commit/d913c9ab583b5c2049a457976754e1e445fcf599))
* **middleware:** use validation only ([ab7aee9](https://github.com/maevsi/maevsi/commit/ab7aee9efeb4917fe71b70e895d06c4bb63576c7))
* **modal-image-selection:** correct submit disabled state ([18b4bed](https://github.com/maevsi/maevsi/commit/18b4bed1f9ce654d7d2fe7424bcef120397d4820))
* **modal:** correct display ([871803e](https://github.com/maevsi/maevsi/commit/871803e1dec94ccd9e8665f6fb3e0976a7cb3b58))
* **modal:** correct error setter ([b28215f](https://github.com/maevsi/maevsi/commit/b28215f6b64d700de1b6c50a5e3f629b5c54136d))
* **modal:** use v-if to show and hide component ([5723e2d](https://github.com/maevsi/maevsi/commit/5723e2df18e2040d86e9e23495297cd05735ecf1)), closes [#758](https://github.com/maevsi/maevsi/issues/758)
* **nuxt:** configure vite dependency optimization ([d8a3108](https://github.com/maevsi/maevsi/commit/d8a3108e3b2ac8a7b87f7b5103161b05a84ccfc1))
* **nuxt:** revert extraction of staging host variable ([36a84ca](https://github.com/maevsi/maevsi/commit/36a84cae19fdc4f04e6a962570be82274d433092))
* **package:** allow insecure server ([e64ca83](https://github.com/maevsi/maevsi/commit/e64ca833585e49a1f6127117182856bbd5975f70))
* **package:** do not install dependencies before build ([d52866c](https://github.com/maevsi/maevsi/commit/d52866c36aa94c9dd2c2f04441135cfe2886d156))
* **package:** ignore missing webpack peer dependencies ([12a4b66](https://github.com/maevsi/maevsi/commit/12a4b66945857aa7e4ae501cd13b3b2502040414))
* **package:** install dependencies recursively ([9d62ba1](https://github.com/maevsi/maevsi/commit/9d62ba1e78e0b2a4a9c8bce26b067d34e49b7821))
* **package:** remove installation from development ([3f87ca8](https://github.com/maevsi/maevsi/commit/3f87ca83b43cbcf83cab14dd9f2cfded83076a40))
* **package:** use ssl for production ([584e15d](https://github.com/maevsi/maevsi/commit/584e15dc1f58e592dc6c16e4516ed0d6108f01e9))
* **pages:** correct locale-path import ([526d223](https://github.com/maevsi/maevsi/commit/526d223ca75ebac9925071989f2008265ef3a2bc))
* prepare nuxt ([48e00bb](https://github.com/maevsi/maevsi/commit/48e00bb80a3f9f84fd30a1e0b423c65d88b23d02))
* **profile-picture:** correct loading ping ([db479df](https://github.com/maevsi/maevsi/commit/db479df24c8a5755025c02d26095245a07156f38))
* **profile-picture:** update cache on change ([0ccabc1](https://github.com/maevsi/maevsi/commit/0ccabc1654caae3f9d86a6abecd577acbbaa2e05))
* remove unused refs ([7643891](https://github.com/maevsi/maevsi/commit/7643891c94ec52115e49bda28b92ff8259814ad3))
* replace undefined with question mark ([fdafd64](https://github.com/maevsi/maevsi/commit/fdafd64cc4e92895486eac5283663f98be71bc47))
* resolve code scanning issues ([9b96d65](https://github.com/maevsi/maevsi/commit/9b96d651299ffecb1e7e1dc9c0299213d90dc369))
* resolve linter issues ([c80a03b](https://github.com/maevsi/maevsi/commit/c80a03b1a794513bef4dea29ab795a536d1cfa6b))
* resolve todos ([aec20ea](https://github.com/maevsi/maevsi/commit/aec20ea2b7a80c4241ebec7d02f984a6543dd978))
* **robots:** correct import ([9dba5b5](https://github.com/maevsi/maevsi/commit/9dba5b5957b12c6d4b0e4cea6676181c16784d04))
* **robots:** specify user agent ([82338c9](https://github.com/maevsi/maevsi/commit/82338c9406c4e64a647d44b568edff242afcedd1))
* **robots:** upgrade to v3 ([260a53e](https://github.com/maevsi/maevsi/commit/260a53e26c43ee4988ce299fc4fd3a0010f44b72)), closes [#740](https://github.com/maevsi/maevsi/issues/740)
* **scripts:** fix invalid shell in dev.sh ([71e0a8a](https://github.com/maevsi/maevsi/commit/71e0a8a68a7ab903b2cdcdc6fbbb40ada8dea259))
* **scroll-container:** check if there is a next page ([410a59a](https://github.com/maevsi/maevsi/commit/410a59a48a16c041223792bf1233d826c2cd7f34))
* **scroll-container:** correct debounce usage ([81e7e0a](https://github.com/maevsi/maevsi/commit/81e7e0af566c95f3c81f18d04fca9aeea38d84b6))
* **scroll-container:** extract maximum height ([88e461f](https://github.com/maevsi/maevsi/commit/88e461f72760fb727ac9bc3136e3a4865db1c225))
* **server:** add event handler wrapper ([39925c4](https://github.com/maevsi/maevsi/commit/39925c43b3ab2e1273bfafed50ad1312679e410f))
* **sign-in:** compute route query property ([19e9fe9](https://github.com/maevsi/maevsi/commit/19e9fe991d6b760d096feec7309d872b1d741257))
* **sqitch:** use uuid v4 ([7bb8e49](https://github.com/maevsi/maevsi/commit/7bb8e499dd677d76c5d88aba7765d4ff4b72de05)), closes [#47](https://github.com/maevsi/maevsi/issues/47)
* **start:** do not create certificates inside docker ([b066377](https://github.com/maevsi/maevsi/commit/b0663777a532cf13751965257ffa1bdc4f15f89f))
* **tailwind:** do not use nuxt configuration as content ([5000a2e](https://github.com/maevsi/maevsi/commit/5000a2ebad75d172b5f35fac344303642955186a))
* **tailwind:** use correct content ([8a81ee4](https://github.com/maevsi/maevsi/commit/8a81ee40368dd06e14afc25ef3348e0c6cb972c8))
* **tests:** use cypress environment variables ([4b65bf4](https://github.com/maevsi/maevsi/commit/4b65bf4b6f9c086713a7c370246525eb0413f7bc))
* **tusd:** correct image upload ([4fcb176](https://github.com/maevsi/maevsi/commit/4fcb176d223799cb4476f6bfb9b535e0461f7a7f))
* **tusd:** correct subdomain url ([4668e21](https://github.com/maevsi/maevsi/commit/4668e2159decacde9f122b6574d93d679b62c6be))
* **tusd:** use staging host ([e42ee93](https://github.com/maevsi/maevsi/commit/e42ee934cf50eb938713e148f249276f25fcf3b7))
* **unlock:** correct error handling ([3a106e5](https://github.com/maevsi/maevsi/commit/3a106e5fa976e60b7590948302c9b50c8e5b20a9))
* **urql:** correct error typing ([b1cdc67](https://github.com/maevsi/maevsi/commit/b1cdc679b989e639db71d7e7c79037f673e89e2f))
* **urql:** correct ssr ([c16838d](https://github.com/maevsi/maevsi/commit/c16838dabdde31481c297bd31054363a1b19d1af)), closes [#952](https://github.com/maevsi/maevsi/issues/952)
* **urql:** implement cache updates ([0432e97](https://github.com/maevsi/maevsi/commit/0432e9705bdcdeddeeb7fa64c5ad3def3ee8a6dc)), closes [#720](https://github.com/maevsi/maevsi/issues/720)
* **urql:** invalidate cache for contacts ([34525f7](https://github.com/maevsi/maevsi/commit/34525f755f2460c802a6e4877962107514eff2da))
* use http ([05ceea9](https://github.com/maevsi/maevsi/commit/05ceea99bf740546de23b1ff06041f392e0da88c))
* **util:** correct domain tld port function ([91540d8](https://github.com/maevsi/maevsi/commit/91540d8176e17ea29210845d448b952cbfb24628))
* **util:** correct domain tld port getter ([690fb59](https://github.com/maevsi/maevsi/commit/690fb5967b0fa9c12a14d2082cb5bd04175daf2f))
* **util:** move uuid to constants ([bde3636](https://github.com/maevsi/maevsi/commit/bde36361db83f96c92eb8972bc9c912afb682af0))


### chore

* add breaking change ([b9006ae](https://github.com/maevsi/maevsi/commit/b9006ae0066600d7194e4269976b9a0accb408ec))


### Features

* **api:** add basic input validation for ical ([0993aeb](https://github.com/maevsi/maevsi/commit/0993aeb905abdddacc5d746ac4b6dc3bd51a9bb8))
* **app:** add loading indicator ([b182bd8](https://github.com/maevsi/maevsi/commit/b182bd8b17f2db40308405e394c87d1b27fc16a4))
* **app:** add move information ([1f65e38](https://github.com/maevsi/maevsi/commit/1f65e383380e8fa36ceb0cb4876704bc2b9dd382))
* **app:** remove migration notice ([bf8236d](https://github.com/maevsi/maevsi/commit/bf8236ddccb669032dde154080f2627696b7d8d7))
* **app:** remove wrapping divs ([fd5fa96](https://github.com/maevsi/maevsi/commit/fd5fa96702c98e9db55d940f7b4a95a287443eb1))
* **auth:** use parameter objects ([4f2e33a](https://github.com/maevsi/maevsi/commit/4f2e33a31636771d6537ee0b0115e7e72736d969))
* **button-list:** set horizontal position individually ([1b7ff47](https://github.com/maevsi/maevsi/commit/1b7ff479c82e8c105b448a49567fb6ff934252ff))
* **calendar:** introduce vCalendar ([7ba11fd](https://github.com/maevsi/maevsi/commit/7ba11fdd9eae83959022fefab57eed5b98befdda))
* **contact-preview:** do not use placeholder ([9e71660](https://github.com/maevsi/maevsi/commit/9e716600d858f3da149c1a335fa8ce9a39bd0f46))
* **cookie:** add cookie meta information ([5a7f1c7](https://github.com/maevsi/maevsi/commit/5a7f1c7f6b7daebf2e927dc0546be4e60490f675))
* **cypress:** add page tests ([2370a27](https://github.com/maevsi/maevsi/commit/2370a27efe18fdf03eaa18e09826736fd0fce76e))
* **docker:** create dockerfile for arm ([ba1f51d](https://github.com/maevsi/maevsi/commit/ba1f51df78066ddf2620893bbc59ea6fbc341081))
* **docker:** remove node-jiti directory in prepare step ([f5b8eb4](https://github.com/maevsi/maevsi/commit/f5b8eb4626b0b7e27d933fe6027986cc1423dcbe))
* **event:** implement v-calendar modals based on feat/vue/v-calendar ([6681702](https://github.com/maevsi/maevsi/commit/66817024f80c1513f19878063a8742f7d4747b10))
* **event:** update event form based on feat/vue-3/v-calendar with luxon ([285b82a](https://github.com/maevsi/maevsi/commit/285b82a437b9bf169193b3deb752e78f67284b67))
* **footer:** add icon flags vue files ([46f8b51](https://github.com/maevsi/maevsi/commit/46f8b519325a9831735260473c762ba519e9a5fd))
* **footer:** add language flags ([28856c3](https://github.com/maevsi/maevsi/commit/28856c3f682a1715ae74818b9fca2b3a01ccf961))
* **footer:** fix implementation of locale flags ([f9b5370](https://github.com/maevsi/maevsi/commit/f9b53708765ff779071d386c0f5039ccb1de10cf))
* **footer:** replace logo with svg component ([410c600](https://github.com/maevsi/maevsi/commit/410c6004f33cf405482f456f62abac11519a261f))
* **form-event:** finish date-time picker implementation ([612bc5e](https://github.com/maevsi/maevsi/commit/612bc5ee1c463bbc83f82925b80feb49a4b7378b))
* **form-invitation:** improve ux ([4cadfcb](https://github.com/maevsi/maevsi/commit/4cadfcb0ad86105f8e42b3860fb822df13a3b937))
* **form:** use flex ([12a62ba](https://github.com/maevsi/maevsi/commit/12a62bad7d630f23efcbc09fcfdc7cf725e920fd))
* **headers:** remove explicit connect source 'self' ([779ee15](https://github.com/maevsi/maevsi/commit/779ee158f372ddc8996d91ed38b289dfac60dbeb))
* **header:** use logo as svg component ([ba49dfe](https://github.com/maevsi/maevsi/commit/ba49dfe15bc38a83235731fd41420d9491553b22))
* **i18n:** update engine info text ([98e78b9](https://github.com/maevsi/maevsi/commit/98e78b91a18d658e9da14bba6784a31f51736419))
* **i18n:** use new slogan ([f45cb88](https://github.com/maevsi/maevsi/commit/f45cb883e6814294e9cfc97a1a454969f33418c4))
* **ical:** hide technical errors ([54d973b](https://github.com/maevsi/maevsi/commit/54d973bfe4c51170f78e5fe4f36365c79f99cbbd))
* **image-upload-gallery:** add vue-advanced-cropper ([648c2a7](https://github.com/maevsi/maevsi/commit/648c2a7a8aefe96a396dddb0b815ddf9ebc87b83)), closes [#723](https://github.com/maevsi/maevsi/issues/723)
* **index:** correct title ([bdf05bf](https://github.com/maevsi/maevsi/commit/bdf05bf601c31394780fae6721d870e2faa209f5))
* **loader-image:** display error ([f6c3fa9](https://github.com/maevsi/maevsi/commit/f6c3fa9d2d99e1862788e480917c611243e20463)), closes [#947](https://github.com/maevsi/maevsi/issues/947)
* **loader-image:** improve perceived speed ([8777ba4](https://github.com/maevsi/maevsi/commit/8777ba41847a7a8073d0b71112b199c6e14a22c6))
* **locales:** remove exclamation mark from status ([df5c17d](https://github.com/maevsi/maevsi/commit/df5c17d27b0ef539ccc3e712caf54416e798527a))
* **node:** use ssl for production ([69725e7](https://github.com/maevsi/maevsi/commit/69725e71cb59676bea9e0efc91b57d495be20659))
* **nuxt:** add page transition ([ba55565](https://github.com/maevsi/maevsi/commit/ba55565cf4123165e0bf3d5d61f12af508ae0b45))
* **nuxt:** add pwa module ([1bbfc68](https://github.com/maevsi/maevsi/commit/1bbfc6897112d895b41ad02d7ac2ff070f8134d7))
* **nuxt:** support domain from subdomain ([8d0908d](https://github.com/maevsi/maevsi/commit/8d0908da8b58ef338bf52c36092e2bf8c5887b2a))
* **package:** update node to v19 ([3b99ef9](https://github.com/maevsi/maevsi/commit/3b99ef9647569fd8d56911b56b5f856571d1a012))
* **pages:** correct meta redirects ([d1ce421](https://github.com/maevsi/maevsi/commit/d1ce421dedb3b1be9d0870d84b238d3928f3b197))
* **pages:** remove title validation ([5e81b50](https://github.com/maevsi/maevsi/commit/5e81b5048cf2c7f1612116b5e8f58388d6e0b1cd))
* **plugins:** remove croppa ([ae33e74](https://github.com/maevsi/maevsi/commit/ae33e740a820b7ca91970a48dcd0cf6950dbb508)), closes [#723](https://github.com/maevsi/maevsi/issues/723)
* readd nuxt cookie control ([9c6daa7](https://github.com/maevsi/maevsi/commit/9c6daa7048c499abdd0ddacb23d5856d045b24e2))
* remove certificates ([03323fa](https://github.com/maevsi/maevsi/commit/03323fa82abe637907e3af44d36b9c079f53a9cb))
* replace moment with dayjs ([f66270b](https://github.com/maevsi/maevsi/commit/f66270bebd055e44a371da3cef95039141e991ee))
* separate stack development ([59bf267](https://github.com/maevsi/maevsi/commit/59bf2670dec079f4882b6ca9bf375e430ee383fc))
* **sitemap:** use plugin ([243760c](https://github.com/maevsi/maevsi/commit/243760c7194b66ba55cad103b371a2729b5acba8)), closes [#741](https://github.com/maevsi/maevsi/issues/741)
* **start:** move certificates to separate directory ([1c855b8](https://github.com/maevsi/maevsi/commit/1c855b8773f7b7395f795f8c64498ad93bbd47f9))
* **swal:** show confirmation and error modal in a corner, non-blocking ([9ca7814](https://github.com/maevsi/maevsi/commit/9ca781499f873d132766b86b57fae38360bdf914)), closes [#921](https://github.com/maevsi/maevsi/issues/921)
* **tests:** add integration tests - check if page loads ([8010c8d](https://github.com/maevsi/maevsi/commit/8010c8dd93a077d2a013beefcf9717723f312f3e))


### Performance Improvements

* **dev:** do not create certificates without need ([86a0120](https://github.com/maevsi/maevsi/commit/86a012088e49e6288979fdf68adbf5a8f3761f26))


### Reverts

* Revert "chore(deps): pin dependencies" ([a664f4f](https://github.com/maevsi/maevsi/commit/a664f4f3482e702e213668444a8336f2c3c14439))
* Revert "test(cypress): run production on different port" ([5e27142](https://github.com/maevsi/maevsi/commit/5e271429e1e198fcef9bc3c21b0367f5ddea9635))
* Revert "fix(form): compute" ([8d5efd8](https://github.com/maevsi/maevsi/commit/8d5efd8781c0a6ac69d0e94f53574a9b7fd03e39))
* Revert "chore(test): move cypress directory" ([6078107](https://github.com/maevsi/maevsi/commit/60781073e3316e4f5dce297c8ad56856f8a5a06a))
* Revert "fix(package): remove host restriction" ([961d0aa](https://github.com/maevsi/maevsi/commit/961d0aa85054e1915a59d7798bad8913637eb319))


### BREAKING CHANGES

* prepare v1

# [1.0.0-beta.13](https://github.com/maevsi/maevsi/compare/1.0.0-beta.12...1.0.0-beta.13) (2022-12-15)


### Bug Fixes

* **dayjs:** workaround ssr issue ([da03164](https://github.com/maevsi/maevsi/commit/da03164318f22acaa68d46a2a4fcd3e18e135092)), closes [#956](https://github.com/maevsi/maevsi/issues/956)

# [1.0.0-beta.12](https://github.com/maevsi/maevsi/compare/1.0.0-beta.11...1.0.0-beta.12) (2022-12-14)


### Features

* **nuxt:** add pwa module ([1bbfc68](https://github.com/maevsi/maevsi/commit/1bbfc6897112d895b41ad02d7ac2ff070f8134d7))

# [1.0.0-beta.11](https://github.com/maevsi/maevsi/compare/1.0.0-beta.10...1.0.0-beta.11) (2022-12-14)


### Bug Fixes

* **commitlint:** extend maximum line length rule to footer ([fb767c8](https://github.com/maevsi/maevsi/commit/fb767c880c3ca779bc04787bdf656b47035579f2))
* **cypress:** wait for control button to be visible ([f598fb1](https://github.com/maevsi/maevsi/commit/f598fb12b37d51c05b63d35ae2e5c8ed3f68aebf))


### Features

* **cookie:** add cookie meta information ([5a7f1c7](https://github.com/maevsi/maevsi/commit/5a7f1c7f6b7daebf2e927dc0546be4e60490f675))
* **docker:** remove node-jiti directory in prepare step ([f5b8eb4](https://github.com/maevsi/maevsi/commit/f5b8eb4626b0b7e27d933fe6027986cc1423dcbe))
* **locales:** remove exclamation mark from status ([df5c17d](https://github.com/maevsi/maevsi/commit/df5c17d27b0ef539ccc3e712caf54416e798527a))
* **swal:** show confirmation and error modal in a corner, non-blocking ([9ca7814](https://github.com/maevsi/maevsi/commit/9ca781499f873d132766b86b57fae38360bdf914)), closes [#921](https://github.com/maevsi/maevsi/issues/921)

# [1.0.0-beta.10](https://github.com/maevsi/maevsi/compare/1.0.0-beta.9...1.0.0-beta.10) (2022-12-13)


### Bug Fixes

* **commitlint:** allow long body lines on CI ([bbb1f0b](https://github.com/maevsi/maevsi/commit/bbb1f0b887193ae0b3deca2cdc2bab7de01203d3))
* **cypress:** properly account for cookie banner ([3deb1d8](https://github.com/maevsi/maevsi/commit/3deb1d8f2077b6a13fb56e6b9b2911aea43ea405))
* **nuxt:** configure vite dependency optimization ([d8a3108](https://github.com/maevsi/maevsi/commit/d8a3108e3b2ac8a7b87f7b5103161b05a84ccfc1))
* **package:** ignore missing webpack peer dependencies ([12a4b66](https://github.com/maevsi/maevsi/commit/12a4b66945857aa7e4ae501cd13b3b2502040414))
* **package:** install dependencies recursively ([9d62ba1](https://github.com/maevsi/maevsi/commit/9d62ba1e78e0b2a4a9c8bce26b067d34e49b7821))
* prepare nuxt ([48e00bb](https://github.com/maevsi/maevsi/commit/48e00bb80a3f9f84fd30a1e0b423c65d88b23d02))


### Features

* **loader-image:** improve perceived speed ([8777ba4](https://github.com/maevsi/maevsi/commit/8777ba41847a7a8073d0b71112b199c6e14a22c6))
* readd nuxt cookie control ([9c6daa7](https://github.com/maevsi/maevsi/commit/9c6daa7048c499abdd0ddacb23d5856d045b24e2))

# [1.0.0-beta.9](https://github.com/maevsi/maevsi/compare/1.0.0-beta.8...1.0.0-beta.9) (2022-12-07)


### Bug Fixes

* **contact-avatar:** revert size property change ([d502d17](https://github.com/maevsi/maevsi/commit/d502d17c3a8391d6b22d800120eca92142049e68))
* **css:** add margin to links and buttons with rings ([0a77fe0](https://github.com/maevsi/maevsi/commit/0a77fe03ac3702edc180f645849d8f36cd984206))
* **cypress:** correct server test ([2016eb9](https://github.com/maevsi/maevsi/commit/2016eb930166141f47daff5d0b13349b2159faa8))
* **event-list:** correct markup ([46f8755](https://github.com/maevsi/maevsi/commit/46f8755ea8e52e795c0184b2719d0b4cddfc48d4))
* **layout:** initialize color scheme selection on client only ([1a42286](https://github.com/maevsi/maevsi/commit/1a422865891b58c65e7083b4a80a7e37fe6e6d90))
* **loader-image:** use classes ([63a27d9](https://github.com/maevsi/maevsi/commit/63a27d910088324aa90ce021b350f300a22da3a2))
* **tusd:** correct image upload ([4fcb176](https://github.com/maevsi/maevsi/commit/4fcb176d223799cb4476f6bfb9b535e0461f7a7f))


### Features

* **footer:** replace logo with svg component ([410c600](https://github.com/maevsi/maevsi/commit/410c6004f33cf405482f456f62abac11519a261f))
* **header:** use logo as svg component ([ba49dfe](https://github.com/maevsi/maevsi/commit/ba49dfe15bc38a83235731fd41420d9491553b22))

# [1.0.0-beta.8](https://github.com/maevsi/maevsi/compare/1.0.0-beta.7...1.0.0-beta.8) (2022-12-06)


### Bug Fixes

* **loader:** correct size ([7b70cf1](https://github.com/maevsi/maevsi/commit/7b70cf17819113345345a99b13e5e04c3a3ff83f))
* **urql:** correct error typing ([b1cdc67](https://github.com/maevsi/maevsi/commit/b1cdc679b989e639db71d7e7c79037f673e89e2f))

# [1.0.0-beta.7](https://github.com/maevsi/maevsi/compare/1.0.0-beta.6...1.0.0-beta.7) (2022-12-04)


### Bug Fixes

* **event:** use correct route variable ([59ee3c5](https://github.com/maevsi/maevsi/commit/59ee3c5a3fa75e5c6b564bb3daff1ad38866d49c))
* **form:** correct vuelidate properties ([cbbdfb8](https://github.com/maevsi/maevsi/commit/cbbdfb8c4c3d6db312448cffb66a7e67b54a8059))
* **tailwind:** do not use nuxt configuration as content ([5000a2e](https://github.com/maevsi/maevsi/commit/5000a2ebad75d172b5f35fac344303642955186a))
* **tailwind:** use correct content ([8a81ee4](https://github.com/maevsi/maevsi/commit/8a81ee40368dd06e14afc25ef3348e0c6cb972c8))
* **urql:** correct ssr ([c16838d](https://github.com/maevsi/maevsi/commit/c16838dabdde31481c297bd31054363a1b19d1af)), closes [#952](https://github.com/maevsi/maevsi/issues/952)
* **util:** correct domain tld port function ([91540d8](https://github.com/maevsi/maevsi/commit/91540d8176e17ea29210845d448b952cbfb24628))


### Features

* **loader-image:** display error ([f6c3fa9](https://github.com/maevsi/maevsi/commit/f6c3fa9d2d99e1862788e480917c611243e20463)), closes [#947](https://github.com/maevsi/maevsi/issues/947)

# [1.0.0-beta.6](https://github.com/maevsi/maevsi/compare/1.0.0-beta.5...1.0.0-beta.6) (2022-11-26)


### Bug Fixes

* **docker:** correct e2e path ([677e01f](https://github.com/maevsi/maevsi/commit/677e01f9dad03746a19d3f6e7eaadf5c262531f2))
* **docker:** correct e2e tests ([d4e74a5](https://github.com/maevsi/maevsi/commit/d4e74a51edf8948b222f8a7684de9a3e6d192df4))


### Features

* **docker:** create dockerfile for arm ([ba1f51d](https://github.com/maevsi/maevsi/commit/ba1f51df78066ddf2620893bbc59ea6fbc341081))

# [1.0.0-beta.5](https://github.com/maevsi/maevsi/compare/1.0.0-beta.4...1.0.0-beta.5) (2022-11-25)


### Bug Fixes

* **form-contact:** close on saved edit ([8c0fe69](https://github.com/maevsi/maevsi/commit/8c0fe6935b5b0d0b0e6da33991c602715b3a1263)), closes [#939](https://github.com/maevsi/maevsi/issues/939)
* **layout-footer:** reenable color mode selection ([3669673](https://github.com/maevsi/maevsi/commit/36696734041537ce152d213993965f34264f0fe2)), closes [#926](https://github.com/maevsi/maevsi/issues/926)

# [1.0.0-beta.4](https://github.com/maevsi/maevsi/compare/1.0.0-beta.3...1.0.0-beta.4) (2022-11-25)


### Bug Fixes

* **tusd:** correct subdomain url ([4668e21](https://github.com/maevsi/maevsi/commit/4668e2159decacde9f122b6574d93d679b62c6be))


### Features

* **index:** correct title ([bdf05bf](https://github.com/maevsi/maevsi/commit/bdf05bf601c31394780fae6721d870e2faa209f5))

# [1.0.0-beta.3](https://github.com/maevsi/maevsi/compare/1.0.0-beta.2...1.0.0-beta.3) (2022-11-24)


### Bug Fixes

* **docker:** reenable test ([4891376](https://github.com/maevsi/maevsi/commit/48913762ba2f0f18baee54e43f7ff1bc6f092f77))
* **docker:** run integration tests consecutively ([983bad3](https://github.com/maevsi/maevsi/commit/983bad3f8714533c95a6106c225573562a65294a))
* **util:** correct domain tld port getter ([690fb59](https://github.com/maevsi/maevsi/commit/690fb5967b0fa9c12a14d2082cb5bd04175daf2f))


### Features

* **headers:** remove explicit connect source 'self' ([779ee15](https://github.com/maevsi/maevsi/commit/779ee158f372ddc8996d91ed38b289dfac60dbeb))
* **nuxt:** support domain from subdomain ([8d0908d](https://github.com/maevsi/maevsi/commit/8d0908da8b58ef338bf52c36092e2bf8c5887b2a))

# [1.0.0-beta.2](https://github.com/maevsi/maevsi/compare/1.0.0-beta.1...1.0.0-beta.2) (2022-11-24)


### Bug Fixes

* use http ([05ceea9](https://github.com/maevsi/maevsi/commit/05ceea99bf740546de23b1ff06041f392e0da88c))


### Features

* **app:** remove migration notice ([bf8236d](https://github.com/maevsi/maevsi/commit/bf8236ddccb669032dde154080f2627696b7d8d7))
* remove certificates ([03323fa](https://github.com/maevsi/maevsi/commit/03323fa82abe637907e3af44d36b9c079f53a9cb))

# [1.0.0-beta.1](https://github.com/maevsi/maevsi/compare/0.147.0...1.0.0-beta.1) (2022-11-23)


### Bug Fixes

* **api:** add missing import ([f58cbd0](https://github.com/maevsi/maevsi/commit/f58cbd0ea6c8e5271dbfb65ec78e46f24f6ff207))
* **api:** correct host getter ([5e06db7](https://github.com/maevsi/maevsi/commit/5e06db772d4bd51ed843cd2eba28790a9a8d73d3))
* **api:** correct pagination ([3e5f0cf](https://github.com/maevsi/maevsi/commit/3e5f0cf5483442ed6ee10d271722826bf6a06070))
* **api:** reset errors ([eee44c8](https://github.com/maevsi/maevsi/commit/eee44c853b99387cf4a8fa3baec2286d11d0f24d))
* **app:** correct nuxt 3 link ([7184776](https://github.com/maevsi/maevsi/commit/718477662e9d285becba5e46cb57a30b8f94c1a8))
* **attendance:** enable qr-code-stream ([b8e9bc2](https://github.com/maevsi/maevsi/commit/b8e9bc23a2f5903c4ddf472a42eef5c457835237))
* **auth:** disable jwt validation for development against staging ([d030af4](https://github.com/maevsi/maevsi/commit/d030af4b274a88edb02a549da5b6f643c851c84f))
* **breadcrumb:** fixed routing in breadcrumbs ([93ab582](https://github.com/maevsi/maevsi/commit/93ab5820419f319c5aa6633370df48802f9b472d))
* **breadcrumbs:** migrate append property to function ([e4ea575](https://github.com/maevsi/maevsi/commit/e4ea57596d6468dfb17b5516e790bb61ab861bb9))
* **card:** remove duplicate class name ([37769f6](https://github.com/maevsi/maevsi/commit/37769f69ab89ae2e27f65745e4f275582d6a4102))
* **chart:** update to v4 ([70c258f](https://github.com/maevsi/maevsi/commit/70c258fd47c0a40214b0724e3dab5d2e273c4ec9))
* **color-mode:** temporarily disable selection ([27fc2be](https://github.com/maevsi/maevsi/commit/27fc2be6a25fdff5580aa8aedc9a10230c2b0a34))
* **components:** migrate v-model usage ([67f9451](https://github.com/maevsi/maevsi/commit/67f9451b20a2094c3443ebbaf042f276d6f8e93a))
* **components:** resolve html validation errors ([0820d1b](https://github.com/maevsi/maevsi/commit/0820d1b294d7bc050cffe080426b2ccf55c00f16))
* **composable:** support computed ref in head ([7d1f076](https://github.com/maevsi/maevsi/commit/7d1f076aad6b7ecabf7fbbbdf86b284e01b071a7)), closes [#898](https://github.com/maevsi/maevsi/issues/898)
* compute data where required ([daf0e0e](https://github.com/maevsi/maevsi/commit/daf0e0e6fb0af5929371fc426e0e8048b7972b99))
* **consola:** correct log level ([1f72020](https://github.com/maevsi/maevsi/commit/1f72020c3c6ec3ab1fa6cc807dfa418c6038a6ea))
* **contact:** correctly finish deletions ([a6867ff](https://github.com/maevsi/maevsi/commit/a6867ff5f201f12bc9f52b4f13dfc14692606933))
* **contact:** delete by id ([889380b](https://github.com/maevsi/maevsi/commit/889380b277c26b275f1c462d82015ef23c77097a))
* **docker:** set user in build ([e4ff034](https://github.com/maevsi/maevsi/commit/e4ff0348c9128f2bdcb6e850c31c9fcc339ee8a5))
* **dropdown:** increase sizes ([b9af37c](https://github.com/maevsi/maevsi/commit/b9af37cf95d30fd2e5e7e9aa0a445e0833877b74))
* **error:** add missing layout ([b7eb034](https://github.com/maevsi/maevsi/commit/b7eb034d80dda52940348e9e99e648d0e846bbc2))
* **event-settings:** correct breadcrumb text ([4555ed5](https://github.com/maevsi/maevsi/commit/4555ed5743ba432b5c4fbb308f06288a2dbc7e8c))
* **event-unlock:** correct redirects ([dfc8778](https://github.com/maevsi/maevsi/commit/dfc8778e28a4a879f42c0f4abdabe027f5e2c0c3))
* **event-unlock:** downgrade nuxt ([97a90c2](https://github.com/maevsi/maevsi/commit/97a90c21c56aa78486aeeed95a3cafdc00d2a9d5))
* **event-unlock:** reactivate layout ([b155dd6](https://github.com/maevsi/maevsi/commit/b155dd641ff3d651d7ba24361062d84d2978b817))
* **event-unlock:** temporarily disable canvas layout ([3fa36cb](https://github.com/maevsi/maevsi/commit/3fa36cbb18f8acdf35c27b154dd72f9f7264e944))
* **event:** allow to clear maximum invitee count ([d045790](https://github.com/maevsi/maevsi/commit/d045790b97761b0e6ae718ec02f113fc64ace308))
* **event:** correct deletion parameters ([aa4e2f4](https://github.com/maevsi/maevsi/commit/aa4e2f4f1c8324bd4e2f42fdfa4f9cc467152c82))
* **event:** correct ical api request ([db3dcdb](https://github.com/maevsi/maevsi/commit/db3dcdbe11fa5ce8bc0bd1127b617facf9fead10))
* **event:** correct page validation ([2f4e360](https://github.com/maevsi/maevsi/commit/2f4e360a1d209958f90f92851c006ff045423005))
* **event:** improve heading responsiveness ([8dcc67e](https://github.com/maevsi/maevsi/commit/8dcc67e2055cdf19f3b95c37d21e8a7f40b01c8b))
* **event:** increase maximum description length ([1af732f](https://github.com/maevsi/maevsi/commit/1af732fe14ef09c00b44a712e8185566f0ca4d3b))
* **event:** readd missing required property ([1bcee49](https://github.com/maevsi/maevsi/commit/1bcee49075d707891a0fff6c4e4befb9771fa5e4))
* **event:** replace world icon with eye icon ([28785d5](https://github.com/maevsi/maevsi/commit/28785d5d507e952f298718f26076924cfc2027fb)), closes [#905](https://github.com/maevsi/maevsi/issues/905)
* **event:** restore link behavior ([bc8c9e9](https://github.com/maevsi/maevsi/commit/bc8c9e9cc43a1afe4b6a825f8699d5965669a745))
* **event:** type events ([54305ae](https://github.com/maevsi/maevsi/commit/54305ae5633bfd02191ba5326c6011628b4c9937))
* **footer:** add gap ([57a7798](https://github.com/maevsi/maevsi/commit/57a7798a1ddfabfa2d54b9e060f5c0acbc8c45c0))
* **form-account-sign-in:** correct conditional slot ([50ba444](https://github.com/maevsi/maevsi/commit/50ba444d476bbee06147c13414854358ba8d2fc8))
* **form:** correct api data reactivity ([91fec6e](https://github.com/maevsi/maevsi/commit/91fec6e1a91c4fbe9de19f192bf0d6a65068051b))
* **form:** correct card height ([309a248](https://github.com/maevsi/maevsi/commit/309a2487e60822dd03ab96a968266fbb733fa6d3))
* **form:** correct error border radius ([887b44d](https://github.com/maevsi/maevsi/commit/887b44d45f7ac21cb422dfafd20fa9193501b041))
* **form:** correct typing ([2bc5db5](https://github.com/maevsi/maevsi/commit/2bc5db5b7bab107f75701176601008567d4f1e89))
* **form:** set form instead of model ([80c9af4](https://github.com/maevsi/maevsi/commit/80c9af4a9b8dc2463639bfcb46adcd9661162f58))
* **form:** simplify form extraction ([5bf809b](https://github.com/maevsi/maevsi/commit/5bf809b7d07bc372651319cc87a386bf8c7a06ce))
* **form:** use form validation instead of null checks ([7f00d8b](https://github.com/maevsi/maevsi/commit/7f00d8b0fc186f3b98f28fb011ce864af987351d))
* **form:** use vuelidate setter ([4d6894d](https://github.com/maevsi/maevsi/commit/4d6894dfa4cb05317713a31423b10bd856b2564c))
* **form:** watch properties ([ff3762f](https://github.com/maevsi/maevsi/commit/ff3762f9de604a70e7c94eb50c7c0de5f2ef3117)), closes [#834](https://github.com/maevsi/maevsi/issues/834)
* **gql:** add null typing ([769f8fc](https://github.com/maevsi/maevsi/commit/769f8fc8600b07a9efc1714e074b3f7f39ab43fa)), closes [#834](https://github.com/maevsi/maevsi/issues/834)
* **gql:** disable unauthorized tls rejection ([2d421a5](https://github.com/maevsi/maevsi/commit/2d421a5f5aa4bd0fcdcd6ecf5f7aa2fb6627ec15))
* **h3:** revert upgrade ([fb6e5d7](https://github.com/maevsi/maevsi/commit/fb6e5d7bf744e943f467f7f473ad7d525296d96d))
* **header:** compute store property ([393a628](https://github.com/maevsi/maevsi/commit/393a628608e81911df12ee5802c29bffc5487aba))
* **headers:** fix network error "blocked" when uploading a picture ([e10a4ad](https://github.com/maevsi/maevsi/commit/e10a4ad0b21466283b98e58a42066c60a676725b))
* **head:** temporarily move body styling to css ([cb6c351](https://github.com/maevsi/maevsi/commit/cb6c35152d301126585ebd4e39374de33a330594))
* **i18n:** add missing tags ([ba64bc8](https://github.com/maevsi/maevsi/commit/ba64bc893958b747eb0ece09477eb0c43f41928d))
* **i18n:** migrate fallback warning ([47ab45a](https://github.com/maevsi/maevsi/commit/47ab45a6b4efefd8fe2ba76e3dd3af051684db83))
* **i18n:** use all rules ([b3e167d](https://github.com/maevsi/maevsi/commit/b3e167d48a9b91996a602765d4a86755deb52fd4))
* **ical:** remove unnecessary parameter validation ([07b0ca8](https://github.com/maevsi/maevsi/commit/07b0ca8bd8d96fed1982a55b723ee98eb733af81))
* **icon-flag-united-kingdom:** correct translation ([dda0930](https://github.com/maevsi/maevsi/commit/dda0930061891d3a6f2e48b734789128290c1855))
* **icon:** correct container name ([4765012](https://github.com/maevsi/maevsi/commit/4765012ca583348f7f9d279d9aae545d2cbe16cc))
* **image-upload-gallery:** correct conditional display ([693ec6c](https://github.com/maevsi/maevsi/commit/693ec6cf39099bdf04d60102ae63631896ddf302))
* **image-upload-gallery:** redirect to uploads temporarily ([2a29f83](https://github.com/maevsi/maevsi/commit/2a29f833d415fe9338f0234b7c33c72d40be8d2d)), closes [#760](https://github.com/maevsi/maevsi/issues/760)
* **image-upload-gallery:** resolve jwt ref ([b46d0ff](https://github.com/maevsi/maevsi/commit/b46d0ffacfc0818f7257c3a38710ee57a6764998))
* **image:** correct display ([cf4bef3](https://github.com/maevsi/maevsi/commit/cf4bef3154bff0493afc1a3a0e70508a6827c3fb))
* **index:** correct image width ([ef12206](https://github.com/maevsi/maevsi/commit/ef122063c7d9a6bc645860a809363737b3cdaa14))
* **invitation-form:** improve ux ([84d607b](https://github.com/maevsi/maevsi/commit/84d607b2c8fb8fd04741ec52a62ccabccd55dc3f))
* **invitation-list:** correct chart update function ([47e8f21](https://github.com/maevsi/maevsi/commit/47e8f215c8a3b357e1fd335aac99e6aa974ad569))
* **invitation-list:** correct client check ([b9f0173](https://github.com/maevsi/maevsi/commit/b9f0173b53ad8a2e1d3c306bf7836ce96e8bae23))
* **invitations:** enable relay pagination ([76c20a6](https://github.com/maevsi/maevsi/commit/76c20a641834e082312f5d94e6e3532fb6649f4e))
* **jest:** add module mapping ([0814fd9](https://github.com/maevsi/maevsi/commit/0814fd9816d3a08e8b246e5a52d0a4093e44647d))
* **layout-header:** correct display ([9a79354](https://github.com/maevsi/maevsi/commit/9a7935490776b01e2d6ac9633297ffd00b7bd0e4))
* **layout:** correct footer offset ([0dda770](https://github.com/maevsi/maevsi/commit/0dda770451f068bdc027a9386790fc4df323c7f9))
* **list:** add missing padding ([4568537](https://github.com/maevsi/maevsi/commit/456853724dd910a0b578afe700dd5e778e5fac3c))
* **loader-image:** correct state update placement ([28dffcc](https://github.com/maevsi/maevsi/commit/28dffccd7937e315ebfa1cdb6686f32a2af10aaa))
* **loader-image:** set aspect ratio ([72d70d9](https://github.com/maevsi/maevsi/commit/72d70d93aefae41a9c00a481ff69d78ddbd92f19))
* **loader-indicator:** correct display behavior ([89ad270](https://github.com/maevsi/maevsi/commit/89ad2705007406dfe487feacea118921926f2d99))
* **loader:** correct property requirements ([bf02d66](https://github.com/maevsi/maevsi/commit/bf02d6689152e5125b494cd7551e4d1b551637eb))
* **locales:** remove exclamation mark from title ([735cc22](https://github.com/maevsi/maevsi/commit/735cc22258bd70fda0fe36716bcdbe241044c68d))
* make api reactive ([d913c9a](https://github.com/maevsi/maevsi/commit/d913c9ab583b5c2049a457976754e1e445fcf599))
* **middleware:** use validation only ([ab7aee9](https://github.com/maevsi/maevsi/commit/ab7aee9efeb4917fe71b70e895d06c4bb63576c7))
* **modal-image-selection:** correct submit disabled state ([18b4bed](https://github.com/maevsi/maevsi/commit/18b4bed1f9ce654d7d2fe7424bcef120397d4820))
* **modal:** correct display ([871803e](https://github.com/maevsi/maevsi/commit/871803e1dec94ccd9e8665f6fb3e0976a7cb3b58))
* **modal:** correct error setter ([b28215f](https://github.com/maevsi/maevsi/commit/b28215f6b64d700de1b6c50a5e3f629b5c54136d))
* **modal:** use v-if to show and hide component ([5723e2d](https://github.com/maevsi/maevsi/commit/5723e2df18e2040d86e9e23495297cd05735ecf1)), closes [#758](https://github.com/maevsi/maevsi/issues/758)
* **nuxt:** revert extraction of staging host variable ([36a84ca](https://github.com/maevsi/maevsi/commit/36a84cae19fdc4f04e6a962570be82274d433092))
* **package:** allow insecure server ([e64ca83](https://github.com/maevsi/maevsi/commit/e64ca833585e49a1f6127117182856bbd5975f70))
* **package:** do not install dependencies before build ([d52866c](https://github.com/maevsi/maevsi/commit/d52866c36aa94c9dd2c2f04441135cfe2886d156))
* **package:** remove installation from development ([3f87ca8](https://github.com/maevsi/maevsi/commit/3f87ca83b43cbcf83cab14dd9f2cfded83076a40))
* **package:** use ssl for production ([584e15d](https://github.com/maevsi/maevsi/commit/584e15dc1f58e592dc6c16e4516ed0d6108f01e9))
* **pages:** correct locale-path import ([526d223](https://github.com/maevsi/maevsi/commit/526d223ca75ebac9925071989f2008265ef3a2bc))
* **profile-picture:** correct loading ping ([db479df](https://github.com/maevsi/maevsi/commit/db479df24c8a5755025c02d26095245a07156f38))
* **profile-picture:** update cache on change ([0ccabc1](https://github.com/maevsi/maevsi/commit/0ccabc1654caae3f9d86a6abecd577acbbaa2e05))
* remove unused refs ([7643891](https://github.com/maevsi/maevsi/commit/7643891c94ec52115e49bda28b92ff8259814ad3))
* replace undefined with question mark ([fdafd64](https://github.com/maevsi/maevsi/commit/fdafd64cc4e92895486eac5283663f98be71bc47))
* resolve code scanning issues ([9b96d65](https://github.com/maevsi/maevsi/commit/9b96d651299ffecb1e7e1dc9c0299213d90dc369))
* resolve linter issues ([c80a03b](https://github.com/maevsi/maevsi/commit/c80a03b1a794513bef4dea29ab795a536d1cfa6b))
* resolve todos ([aec20ea](https://github.com/maevsi/maevsi/commit/aec20ea2b7a80c4241ebec7d02f984a6543dd978))
* **robots:** correct import ([9dba5b5](https://github.com/maevsi/maevsi/commit/9dba5b5957b12c6d4b0e4cea6676181c16784d04))
* **robots:** specify user agent ([82338c9](https://github.com/maevsi/maevsi/commit/82338c9406c4e64a647d44b568edff242afcedd1))
* **robots:** upgrade to v3 ([260a53e](https://github.com/maevsi/maevsi/commit/260a53e26c43ee4988ce299fc4fd3a0010f44b72)), closes [#740](https://github.com/maevsi/maevsi/issues/740)
* **scripts:** fix invalid shell in dev.sh ([71e0a8a](https://github.com/maevsi/maevsi/commit/71e0a8a68a7ab903b2cdcdc6fbbb40ada8dea259))
* **scroll-container:** check if there is a next page ([410a59a](https://github.com/maevsi/maevsi/commit/410a59a48a16c041223792bf1233d826c2cd7f34))
* **scroll-container:** correct debounce usage ([81e7e0a](https://github.com/maevsi/maevsi/commit/81e7e0af566c95f3c81f18d04fca9aeea38d84b6))
* **scroll-container:** extract maximum height ([88e461f](https://github.com/maevsi/maevsi/commit/88e461f72760fb727ac9bc3136e3a4865db1c225))
* **server:** add event handler wrapper ([39925c4](https://github.com/maevsi/maevsi/commit/39925c43b3ab2e1273bfafed50ad1312679e410f))
* **sign-in:** compute route query property ([19e9fe9](https://github.com/maevsi/maevsi/commit/19e9fe991d6b760d096feec7309d872b1d741257))
* **sqitch:** use uuid v4 ([7bb8e49](https://github.com/maevsi/maevsi/commit/7bb8e499dd677d76c5d88aba7765d4ff4b72de05)), closes [#47](https://github.com/maevsi/maevsi/issues/47)
* **start:** do not create certificates inside docker ([b066377](https://github.com/maevsi/maevsi/commit/b0663777a532cf13751965257ffa1bdc4f15f89f))
* **tests:** use cypress environment variables ([4b65bf4](https://github.com/maevsi/maevsi/commit/4b65bf4b6f9c086713a7c370246525eb0413f7bc))
* **tusd:** use staging host ([e42ee93](https://github.com/maevsi/maevsi/commit/e42ee934cf50eb938713e148f249276f25fcf3b7))
* **unlock:** correct error handling ([3a106e5](https://github.com/maevsi/maevsi/commit/3a106e5fa976e60b7590948302c9b50c8e5b20a9))
* **urql:** implement cache updates ([0432e97](https://github.com/maevsi/maevsi/commit/0432e9705bdcdeddeeb7fa64c5ad3def3ee8a6dc)), closes [#720](https://github.com/maevsi/maevsi/issues/720)
* **urql:** invalidate cache for contacts ([34525f7](https://github.com/maevsi/maevsi/commit/34525f755f2460c802a6e4877962107514eff2da))
* **util:** move uuid to constants ([bde3636](https://github.com/maevsi/maevsi/commit/bde36361db83f96c92eb8972bc9c912afb682af0))


### chore

* add breaking change ([b9006ae](https://github.com/maevsi/maevsi/commit/b9006ae0066600d7194e4269976b9a0accb408ec))


### Features

* **api:** add basic input validation for ical ([0993aeb](https://github.com/maevsi/maevsi/commit/0993aeb905abdddacc5d746ac4b6dc3bd51a9bb8))
* **app:** add loading indicator ([b182bd8](https://github.com/maevsi/maevsi/commit/b182bd8b17f2db40308405e394c87d1b27fc16a4))
* **app:** add move information ([1f65e38](https://github.com/maevsi/maevsi/commit/1f65e383380e8fa36ceb0cb4876704bc2b9dd382))
* **app:** remove wrapping divs ([fd5fa96](https://github.com/maevsi/maevsi/commit/fd5fa96702c98e9db55d940f7b4a95a287443eb1))
* **auth:** use parameter objects ([4f2e33a](https://github.com/maevsi/maevsi/commit/4f2e33a31636771d6537ee0b0115e7e72736d969))
* **button-list:** set horizontal position individually ([1b7ff47](https://github.com/maevsi/maevsi/commit/1b7ff479c82e8c105b448a49567fb6ff934252ff))
* **calendar:** introduce vCalendar ([7ba11fd](https://github.com/maevsi/maevsi/commit/7ba11fdd9eae83959022fefab57eed5b98befdda))
* **contact-preview:** do not use placeholder ([9e71660](https://github.com/maevsi/maevsi/commit/9e716600d858f3da149c1a335fa8ce9a39bd0f46))
* **cypress:** add page tests ([2370a27](https://github.com/maevsi/maevsi/commit/2370a27efe18fdf03eaa18e09826736fd0fce76e))
* **event:** implement v-calendar modals based on feat/vue/v-calendar ([6681702](https://github.com/maevsi/maevsi/commit/66817024f80c1513f19878063a8742f7d4747b10))
* **event:** update event form based on feat/vue-3/v-calendar with luxon ([285b82a](https://github.com/maevsi/maevsi/commit/285b82a437b9bf169193b3deb752e78f67284b67))
* **footer:** add icon flags vue files ([46f8b51](https://github.com/maevsi/maevsi/commit/46f8b519325a9831735260473c762ba519e9a5fd))
* **footer:** add language flags ([28856c3](https://github.com/maevsi/maevsi/commit/28856c3f682a1715ae74818b9fca2b3a01ccf961))
* **footer:** fix implementation of locale flags ([f9b5370](https://github.com/maevsi/maevsi/commit/f9b53708765ff779071d386c0f5039ccb1de10cf))
* **form-event:** finish date-time picker implementation ([612bc5e](https://github.com/maevsi/maevsi/commit/612bc5ee1c463bbc83f82925b80feb49a4b7378b))
* **form-invitation:** improve ux ([4cadfcb](https://github.com/maevsi/maevsi/commit/4cadfcb0ad86105f8e42b3860fb822df13a3b937))
* **form:** use flex ([12a62ba](https://github.com/maevsi/maevsi/commit/12a62bad7d630f23efcbc09fcfdc7cf725e920fd))
* **i18n:** update engine info text ([98e78b9](https://github.com/maevsi/maevsi/commit/98e78b91a18d658e9da14bba6784a31f51736419))
* **i18n:** use new slogan ([f45cb88](https://github.com/maevsi/maevsi/commit/f45cb883e6814294e9cfc97a1a454969f33418c4))
* **ical:** hide technical errors ([54d973b](https://github.com/maevsi/maevsi/commit/54d973bfe4c51170f78e5fe4f36365c79f99cbbd))
* **image-upload-gallery:** add vue-advanced-cropper ([648c2a7](https://github.com/maevsi/maevsi/commit/648c2a7a8aefe96a396dddb0b815ddf9ebc87b83)), closes [#723](https://github.com/maevsi/maevsi/issues/723)
* **node:** use ssl for production ([69725e7](https://github.com/maevsi/maevsi/commit/69725e71cb59676bea9e0efc91b57d495be20659))
* **nuxt:** add page transition ([ba55565](https://github.com/maevsi/maevsi/commit/ba55565cf4123165e0bf3d5d61f12af508ae0b45))
* **package:** update node to v19 ([3b99ef9](https://github.com/maevsi/maevsi/commit/3b99ef9647569fd8d56911b56b5f856571d1a012))
* **pages:** correct meta redirects ([d1ce421](https://github.com/maevsi/maevsi/commit/d1ce421dedb3b1be9d0870d84b238d3928f3b197))
* **pages:** remove title validation ([5e81b50](https://github.com/maevsi/maevsi/commit/5e81b5048cf2c7f1612116b5e8f58388d6e0b1cd))
* **plugins:** remove croppa ([ae33e74](https://github.com/maevsi/maevsi/commit/ae33e740a820b7ca91970a48dcd0cf6950dbb508)), closes [#723](https://github.com/maevsi/maevsi/issues/723)
* replace moment with dayjs ([f66270b](https://github.com/maevsi/maevsi/commit/f66270bebd055e44a371da3cef95039141e991ee))
* separate stack development ([59bf267](https://github.com/maevsi/maevsi/commit/59bf2670dec079f4882b6ca9bf375e430ee383fc))
* **sitemap:** use plugin ([243760c](https://github.com/maevsi/maevsi/commit/243760c7194b66ba55cad103b371a2729b5acba8)), closes [#741](https://github.com/maevsi/maevsi/issues/741)
* **start:** move certificates to separate directory ([1c855b8](https://github.com/maevsi/maevsi/commit/1c855b8773f7b7395f795f8c64498ad93bbd47f9))
* **tests:** add integration tests - check if page loads ([8010c8d](https://github.com/maevsi/maevsi/commit/8010c8dd93a077d2a013beefcf9717723f312f3e))


### Performance Improvements

* **dev:** do not create certificates without need ([86a0120](https://github.com/maevsi/maevsi/commit/86a012088e49e6288979fdf68adbf5a8f3761f26))


### Reverts

* Revert "chore(test): move cypress directory" ([6078107](https://github.com/maevsi/maevsi/commit/60781073e3316e4f5dce297c8ad56856f8a5a06a))
* Revert "fix(package): remove host restriction" ([961d0aa](https://github.com/maevsi/maevsi/commit/961d0aa85054e1915a59d7798bad8913637eb319))


### BREAKING CHANGES

* prepare v1

# [1.0.0-alpha.19](https://github.com/maevsi/maevsi/compare/1.0.0-alpha.18...1.0.0-alpha.19) (2022-11-22)


### Features

* **sitemap:** use plugin ([243760c](https://github.com/maevsi/maevsi/commit/243760c7194b66ba55cad103b371a2729b5acba8)), closes [#741](https://github.com/maevsi/maevsi/issues/741)

# [1.0.0-alpha.18](https://github.com/maevsi/maevsi/compare/1.0.0-alpha.17...1.0.0-alpha.18) (2022-11-22)


### Bug Fixes

* **color-mode:** temporarily disable selection ([27fc2be](https://github.com/maevsi/maevsi/commit/27fc2be6a25fdff5580aa8aedc9a10230c2b0a34))
* **dropdown:** increase sizes ([b9af37c](https://github.com/maevsi/maevsi/commit/b9af37cf95d30fd2e5e7e9aa0a445e0833877b74))
* **event-settings:** correct breadcrumb text ([4555ed5](https://github.com/maevsi/maevsi/commit/4555ed5743ba432b5c4fbb308f06288a2dbc7e8c))
* **event:** improve heading responsiveness ([8dcc67e](https://github.com/maevsi/maevsi/commit/8dcc67e2055cdf19f3b95c37d21e8a7f40b01c8b))
* **event:** replace world icon with eye icon ([28785d5](https://github.com/maevsi/maevsi/commit/28785d5d507e952f298718f26076924cfc2027fb)), closes [#905](https://github.com/maevsi/maevsi/issues/905)
* **event:** restore link behavior ([bc8c9e9](https://github.com/maevsi/maevsi/commit/bc8c9e9cc43a1afe4b6a825f8699d5965669a745))
* **form-account-sign-in:** correct conditional slot ([50ba444](https://github.com/maevsi/maevsi/commit/50ba444d476bbee06147c13414854358ba8d2fc8))
* **form:** correct card height ([309a248](https://github.com/maevsi/maevsi/commit/309a2487e60822dd03ab96a968266fbb733fa6d3))
* **index:** correct image width ([ef12206](https://github.com/maevsi/maevsi/commit/ef122063c7d9a6bc645860a809363737b3cdaa14))
* **invitation-form:** improve ux ([84d607b](https://github.com/maevsi/maevsi/commit/84d607b2c8fb8fd04741ec52a62ccabccd55dc3f))
* **loader-image:** correct state update placement ([28dffcc](https://github.com/maevsi/maevsi/commit/28dffccd7937e315ebfa1cdb6686f32a2af10aaa))
* **modal:** correct display ([871803e](https://github.com/maevsi/maevsi/commit/871803e1dec94ccd9e8665f6fb3e0976a7cb3b58))
* remove unused refs ([7643891](https://github.com/maevsi/maevsi/commit/7643891c94ec52115e49bda28b92ff8259814ad3))
* **robots:** correct import ([9dba5b5](https://github.com/maevsi/maevsi/commit/9dba5b5957b12c6d4b0e4cea6676181c16784d04))
* **robots:** upgrade to v3 ([260a53e](https://github.com/maevsi/maevsi/commit/260a53e26c43ee4988ce299fc4fd3a0010f44b72)), closes [#740](https://github.com/maevsi/maevsi/issues/740)
* **scroll-container:** extract maximum height ([88e461f](https://github.com/maevsi/maevsi/commit/88e461f72760fb727ac9bc3136e3a4865db1c225))
* **start:** do not create certificates inside docker ([b066377](https://github.com/maevsi/maevsi/commit/b0663777a532cf13751965257ffa1bdc4f15f89f))


### Features

* **form:** use flex ([12a62ba](https://github.com/maevsi/maevsi/commit/12a62bad7d630f23efcbc09fcfdc7cf725e920fd))
* **nuxt:** add page transition ([ba55565](https://github.com/maevsi/maevsi/commit/ba55565cf4123165e0bf3d5d61f12af508ae0b45))
* replace moment with dayjs ([f66270b](https://github.com/maevsi/maevsi/commit/f66270bebd055e44a371da3cef95039141e991ee))
* **start:** move certificates to separate directory ([1c855b8](https://github.com/maevsi/maevsi/commit/1c855b8773f7b7395f795f8c64498ad93bbd47f9))


### Reverts

* Revert "fix(form): compute" ([8d5efd8](https://github.com/maevsi/maevsi/commit/8d5efd8781c0a6ac69d0e94f53574a9b7fd03e39))

# [1.0.0-alpha.17](https://github.com/maevsi/maevsi/compare/1.0.0-alpha.16...1.0.0-alpha.17) (2022-11-17)


### Bug Fixes

* **api:** reset errors ([eee44c8](https://github.com/maevsi/maevsi/commit/eee44c853b99387cf4a8fa3baec2286d11d0f24d))
* **app:** correct nuxt 3 link ([7184776](https://github.com/maevsi/maevsi/commit/718477662e9d285becba5e46cb57a30b8f94c1a8))
* **attendance:** enable qr-code-stream ([b8e9bc2](https://github.com/maevsi/maevsi/commit/b8e9bc23a2f5903c4ddf472a42eef5c457835237))
* **form:** compute ([8c55a70](https://github.com/maevsi/maevsi/commit/8c55a70eed03224962f0cf734b736f11db42d212))
* **form:** correct error border radius ([887b44d](https://github.com/maevsi/maevsi/commit/887b44d45f7ac21cb422dfafd20fa9193501b041))
* **form:** set form instead of model ([80c9af4](https://github.com/maevsi/maevsi/commit/80c9af4a9b8dc2463639bfcb46adcd9661162f58))
* **form:** use form validation instead of null checks ([7f00d8b](https://github.com/maevsi/maevsi/commit/7f00d8b0fc186f3b98f28fb011ce864af987351d))
* **i18n:** use all rules ([b3e167d](https://github.com/maevsi/maevsi/commit/b3e167d48a9b91996a602765d4a86755deb52fd4))
* **image-upload-gallery:** redirect to uploads temporarily ([2a29f83](https://github.com/maevsi/maevsi/commit/2a29f833d415fe9338f0234b7c33c72d40be8d2d)), closes [#760](https://github.com/maevsi/maevsi/issues/760)
* **layout-header:** correct display ([9a79354](https://github.com/maevsi/maevsi/commit/9a7935490776b01e2d6ac9633297ffd00b7bd0e4))
* **layout:** correct footer offset ([0dda770](https://github.com/maevsi/maevsi/commit/0dda770451f068bdc027a9386790fc4df323c7f9))
* **list:** add missing padding ([4568537](https://github.com/maevsi/maevsi/commit/456853724dd910a0b578afe700dd5e778e5fac3c))
* **loader-image:** set aspect ratio ([72d70d9](https://github.com/maevsi/maevsi/commit/72d70d93aefae41a9c00a481ff69d78ddbd92f19))
* **loader-indicator:** correct display behavior ([89ad270](https://github.com/maevsi/maevsi/commit/89ad2705007406dfe487feacea118921926f2d99))
* **modal-image-selection:** correct submit disabled state ([18b4bed](https://github.com/maevsi/maevsi/commit/18b4bed1f9ce654d7d2fe7424bcef120397d4820))
* **modal:** use v-if to show and hide component ([5723e2d](https://github.com/maevsi/maevsi/commit/5723e2df18e2040d86e9e23495297cd05735ecf1)), closes [#758](https://github.com/maevsi/maevsi/issues/758)
* **profile-picture:** correct loading ping ([db479df](https://github.com/maevsi/maevsi/commit/db479df24c8a5755025c02d26095245a07156f38))
* **profile-picture:** update cache on change ([0ccabc1](https://github.com/maevsi/maevsi/commit/0ccabc1654caae3f9d86a6abecd577acbbaa2e05))
* resolve todos ([aec20ea](https://github.com/maevsi/maevsi/commit/aec20ea2b7a80c4241ebec7d02f984a6543dd978))
* **unlock:** correct error handling ([3a106e5](https://github.com/maevsi/maevsi/commit/3a106e5fa976e60b7590948302c9b50c8e5b20a9))


### Features

* **app:** add loading indicator ([b182bd8](https://github.com/maevsi/maevsi/commit/b182bd8b17f2db40308405e394c87d1b27fc16a4))
* **button-list:** set horizontal position individually ([1b7ff47](https://github.com/maevsi/maevsi/commit/1b7ff479c82e8c105b448a49567fb6ff934252ff))
* **contact-preview:** do not use placeholder ([9e71660](https://github.com/maevsi/maevsi/commit/9e716600d858f3da149c1a335fa8ce9a39bd0f46))
* **form-invitation:** improve ux ([4cadfcb](https://github.com/maevsi/maevsi/commit/4cadfcb0ad86105f8e42b3860fb822df13a3b937))
* **i18n:** update engine info text ([98e78b9](https://github.com/maevsi/maevsi/commit/98e78b91a18d658e9da14bba6784a31f51736419))

# [1.0.0-alpha.16](https://github.com/maevsi/maevsi/compare/1.0.0-alpha.15...1.0.0-alpha.16) (2022-11-16)


### Bug Fixes

* **api:** correct pagination ([3e5f0cf](https://github.com/maevsi/maevsi/commit/3e5f0cf5483442ed6ee10d271722826bf6a06070))
* **chart:** update to v4 ([70c258f](https://github.com/maevsi/maevsi/commit/70c258fd47c0a40214b0724e3dab5d2e273c4ec9))
* **event:** increase maximum description length ([1af732f](https://github.com/maevsi/maevsi/commit/1af732fe14ef09c00b44a712e8185566f0ca4d3b))
* **form:** correct typing ([2bc5db5](https://github.com/maevsi/maevsi/commit/2bc5db5b7bab107f75701176601008567d4f1e89))
* **h3:** revert upgrade ([fb6e5d7](https://github.com/maevsi/maevsi/commit/fb6e5d7bf744e943f467f7f473ad7d525296d96d))
* **invitations:** enable relay pagination ([76c20a6](https://github.com/maevsi/maevsi/commit/76c20a641834e082312f5d94e6e3532fb6649f4e))
* **nuxt:** revert extraction of staging host variable ([36a84ca](https://github.com/maevsi/maevsi/commit/36a84cae19fdc4f04e6a962570be82274d433092))
* **package:** allow insecure server ([e64ca83](https://github.com/maevsi/maevsi/commit/e64ca833585e49a1f6127117182856bbd5975f70))
* **package:** remove installation from development ([3f87ca8](https://github.com/maevsi/maevsi/commit/3f87ca83b43cbcf83cab14dd9f2cfded83076a40))
* **package:** use ssl for production ([584e15d](https://github.com/maevsi/maevsi/commit/584e15dc1f58e592dc6c16e4516ed0d6108f01e9))
* **scroll-container:** check if there is a next page ([410a59a](https://github.com/maevsi/maevsi/commit/410a59a48a16c041223792bf1233d826c2cd7f34))
* **scroll-container:** correct debounce usage ([81e7e0a](https://github.com/maevsi/maevsi/commit/81e7e0af566c95f3c81f18d04fca9aeea38d84b6))
* **sqitch:** use uuid v4 ([7bb8e49](https://github.com/maevsi/maevsi/commit/7bb8e499dd677d76c5d88aba7765d4ff4b72de05)), closes [#47](https://github.com/maevsi/maevsi/issues/47)


### Features

* **i18n:** use new slogan ([f45cb88](https://github.com/maevsi/maevsi/commit/f45cb883e6814294e9cfc97a1a454969f33418c4))
* **node:** use ssl for production ([69725e7](https://github.com/maevsi/maevsi/commit/69725e71cb59676bea9e0efc91b57d495be20659))

# [1.0.0-alpha.15](https://github.com/maevsi/maevsi/compare/1.0.0-alpha.14...1.0.0-alpha.15) (2022-11-14)


### Bug Fixes

* **headers:** fix network error "blocked" when uploading a picture ([e10a4ad](https://github.com/maevsi/maevsi/commit/e10a4ad0b21466283b98e58a42066c60a676725b))

# [1.0.0-alpha.14](https://github.com/maevsi/maevsi/compare/1.0.0-alpha.13...1.0.0-alpha.14) (2022-11-11)


### Bug Fixes

* **composable:** support computed ref in head ([7d1f076](https://github.com/maevsi/maevsi/commit/7d1f076aad6b7ecabf7fbbbdf86b284e01b071a7)), closes [#898](https://github.com/maevsi/maevsi/issues/898)
* **contact:** correctly finish deletions ([a6867ff](https://github.com/maevsi/maevsi/commit/a6867ff5f201f12bc9f52b4f13dfc14692606933))
* **contact:** delete by id ([889380b](https://github.com/maevsi/maevsi/commit/889380b277c26b275f1c462d82015ef23c77097a))
* **docker:** set user in build ([e4ff034](https://github.com/maevsi/maevsi/commit/e4ff0348c9128f2bdcb6e850c31c9fcc339ee8a5))
* **event:** allow to clear maximum invitee count ([d045790](https://github.com/maevsi/maevsi/commit/d045790b97761b0e6ae718ec02f113fc64ace308))
* **event:** correct deletion parameters ([aa4e2f4](https://github.com/maevsi/maevsi/commit/aa4e2f4f1c8324bd4e2f42fdfa4f9cc467152c82))
* **event:** readd missing required property ([1bcee49](https://github.com/maevsi/maevsi/commit/1bcee49075d707891a0fff6c4e4befb9771fa5e4))
* **footer:** add gap ([57a7798](https://github.com/maevsi/maevsi/commit/57a7798a1ddfabfa2d54b9e060f5c0acbc8c45c0))
* **form:** use vuelidate setter ([4d6894d](https://github.com/maevsi/maevsi/commit/4d6894dfa4cb05317713a31423b10bd856b2564c))
* **gql:** add null typing ([769f8fc](https://github.com/maevsi/maevsi/commit/769f8fc8600b07a9efc1714e074b3f7f39ab43fa)), closes [#834](https://github.com/maevsi/maevsi/issues/834)
* **gql:** disable unauthorized tls rejection ([2d421a5](https://github.com/maevsi/maevsi/commit/2d421a5f5aa4bd0fcdcd6ecf5f7aa2fb6627ec15))
* **i18n:** migrate fallback warning ([47ab45a](https://github.com/maevsi/maevsi/commit/47ab45a6b4efefd8fe2ba76e3dd3af051684db83))
* **ical:** remove unnecessary parameter validation ([07b0ca8](https://github.com/maevsi/maevsi/commit/07b0ca8bd8d96fed1982a55b723ee98eb733af81))
* **icon-flag-united-kingdom:** correct translation ([dda0930](https://github.com/maevsi/maevsi/commit/dda0930061891d3a6f2e48b734789128290c1855))
* **image-upload-gallery:** correct conditional display ([693ec6c](https://github.com/maevsi/maevsi/commit/693ec6cf39099bdf04d60102ae63631896ddf302))
* **image:** correct display ([cf4bef3](https://github.com/maevsi/maevsi/commit/cf4bef3154bff0493afc1a3a0e70508a6827c3fb))
* **locales:** remove exclamation mark from title ([735cc22](https://github.com/maevsi/maevsi/commit/735cc22258bd70fda0fe36716bcdbe241044c68d))
* make api reactive ([d913c9a](https://github.com/maevsi/maevsi/commit/d913c9ab583b5c2049a457976754e1e445fcf599))
* **modal:** correct error setter ([b28215f](https://github.com/maevsi/maevsi/commit/b28215f6b64d700de1b6c50a5e3f629b5c54136d))
* **package:** do not install dependencies before build ([d52866c](https://github.com/maevsi/maevsi/commit/d52866c36aa94c9dd2c2f04441135cfe2886d156))
* **robots:** specify user agent ([82338c9](https://github.com/maevsi/maevsi/commit/82338c9406c4e64a647d44b568edff242afcedd1))
* **urql:** implement cache updates ([0432e97](https://github.com/maevsi/maevsi/commit/0432e9705bdcdeddeeb7fa64c5ad3def3ee8a6dc)), closes [#720](https://github.com/maevsi/maevsi/issues/720)
* **urql:** invalidate cache for contacts ([34525f7](https://github.com/maevsi/maevsi/commit/34525f755f2460c802a6e4877962107514eff2da))


### Features

* **ical:** hide technical errors ([54d973b](https://github.com/maevsi/maevsi/commit/54d973bfe4c51170f78e5fe4f36365c79f99cbbd))
* **image-upload-gallery:** add vue-advanced-cropper ([648c2a7](https://github.com/maevsi/maevsi/commit/648c2a7a8aefe96a396dddb0b815ddf9ebc87b83)), closes [#723](https://github.com/maevsi/maevsi/issues/723)
* **package:** update node to v19 ([3b99ef9](https://github.com/maevsi/maevsi/commit/3b99ef9647569fd8d56911b56b5f856571d1a012))
* **plugins:** remove croppa ([ae33e74](https://github.com/maevsi/maevsi/commit/ae33e740a820b7ca91970a48dcd0cf6950dbb508)), closes [#723](https://github.com/maevsi/maevsi/issues/723)

# [1.0.0-alpha.13](https://github.com/maevsi/maevsi/compare/1.0.0-alpha.12...1.0.0-alpha.13) (2022-11-06)


### Bug Fixes

* **api:** correct host getter ([5e06db7](https://github.com/maevsi/maevsi/commit/5e06db772d4bd51ed843cd2eba28790a9a8d73d3))
* **consola:** correct log level ([1f72020](https://github.com/maevsi/maevsi/commit/1f72020c3c6ec3ab1fa6cc807dfa418c6038a6ea))
* **event-unlock:** correct redirects ([dfc8778](https://github.com/maevsi/maevsi/commit/dfc8778e28a4a879f42c0f4abdabe027f5e2c0c3))
* **event-unlock:** downgrade nuxt ([97a90c2](https://github.com/maevsi/maevsi/commit/97a90c21c56aa78486aeeed95a3cafdc00d2a9d5))
* **event-unlock:** reactivate layout ([b155dd6](https://github.com/maevsi/maevsi/commit/b155dd641ff3d651d7ba24361062d84d2978b817))
* **event-unlock:** temporarily disable canvas layout ([3fa36cb](https://github.com/maevsi/maevsi/commit/3fa36cbb18f8acdf35c27b154dd72f9f7264e944))
* **event:** correct ical api request ([db3dcdb](https://github.com/maevsi/maevsi/commit/db3dcdbe11fa5ce8bc0bd1127b617facf9fead10))
* **form:** correct api data reactivity ([91fec6e](https://github.com/maevsi/maevsi/commit/91fec6e1a91c4fbe9de19f192bf0d6a65068051b))
* **head:** temporarily move body styling to css ([cb6c351](https://github.com/maevsi/maevsi/commit/cb6c35152d301126585ebd4e39374de33a330594))
* **invitation-list:** correct chart update function ([47e8f21](https://github.com/maevsi/maevsi/commit/47e8f215c8a3b357e1fd335aac99e6aa974ad569))
* **invitation-list:** correct client check ([b9f0173](https://github.com/maevsi/maevsi/commit/b9f0173b53ad8a2e1d3c306bf7836ce96e8bae23))
* **jest:** add module mapping ([0814fd9](https://github.com/maevsi/maevsi/commit/0814fd9816d3a08e8b246e5a52d0a4093e44647d))
* **util:** move uuid to constants ([bde3636](https://github.com/maevsi/maevsi/commit/bde36361db83f96c92eb8972bc9c912afb682af0))


### Features

* **api:** add basic input validation for ical ([0993aeb](https://github.com/maevsi/maevsi/commit/0993aeb905abdddacc5d746ac4b6dc3bd51a9bb8))
* **app:** add move information ([1f65e38](https://github.com/maevsi/maevsi/commit/1f65e383380e8fa36ceb0cb4876704bc2b9dd382))

# [1.0.0-alpha.12](https://github.com/maevsi/maevsi/compare/1.0.0-alpha.11...1.0.0-alpha.12) (2022-11-02)


### Bug Fixes

* **components:** migrate v-model usage ([67f9451](https://github.com/maevsi/maevsi/commit/67f9451b20a2094c3443ebbaf042f276d6f8e93a))
* resolve linter issues ([c80a03b](https://github.com/maevsi/maevsi/commit/c80a03b1a794513bef4dea29ab795a536d1cfa6b))


### Features

* **calendar:** introduce vCalendar ([7ba11fd](https://github.com/maevsi/maevsi/commit/7ba11fdd9eae83959022fefab57eed5b98befdda))
* **event:** implement v-calendar modals based on feat/vue/v-calendar ([6681702](https://github.com/maevsi/maevsi/commit/66817024f80c1513f19878063a8742f7d4747b10))
* **event:** update event form based on feat/vue-3/v-calendar with luxon ([285b82a](https://github.com/maevsi/maevsi/commit/285b82a437b9bf169193b3deb752e78f67284b67))
* **form-event:** finish date-time picker implementation ([612bc5e](https://github.com/maevsi/maevsi/commit/612bc5ee1c463bbc83f82925b80feb49a4b7378b))

# [1.0.0-alpha.11](https://github.com/maevsi/maevsi/compare/1.0.0-alpha.10...1.0.0-alpha.11) (2022-11-02)


### Bug Fixes

* **components:** resolve html validation errors ([0820d1b](https://github.com/maevsi/maevsi/commit/0820d1b294d7bc050cffe080426b2ccf55c00f16))
* **event:** type events ([54305ae](https://github.com/maevsi/maevsi/commit/54305ae5633bfd02191ba5326c6011628b4c9937))
* **form:** simplify form extraction ([5bf809b](https://github.com/maevsi/maevsi/commit/5bf809b7d07bc372651319cc87a386bf8c7a06ce))
* **form:** watch properties ([ff3762f](https://github.com/maevsi/maevsi/commit/ff3762f9de604a70e7c94eb50c7c0de5f2ef3117)), closes [#834](https://github.com/maevsi/maevsi/issues/834)
* replace undefined with question mark ([fdafd64](https://github.com/maevsi/maevsi/commit/fdafd64cc4e92895486eac5283663f98be71bc47))

# [1.0.0-alpha.10](https://github.com/maevsi/maevsi/compare/1.0.0-alpha.9...1.0.0-alpha.10) (2022-11-01)


### Features

* **footer:** add icon flags vue files ([46f8b51](https://github.com/maevsi/maevsi/commit/46f8b519325a9831735260473c762ba519e9a5fd))
* **footer:** add language flags ([28856c3](https://github.com/maevsi/maevsi/commit/28856c3f682a1715ae74818b9fca2b3a01ccf961))
* **footer:** fix implementation of locale flags ([f9b5370](https://github.com/maevsi/maevsi/commit/f9b53708765ff779071d386c0f5039ccb1de10cf))

# [1.0.0-alpha.9](https://github.com/maevsi/maevsi/compare/1.0.0-alpha.8...1.0.0-alpha.9) (2022-11-01)


### Bug Fixes

* **auth:** disable jwt validation for development against staging ([d030af4](https://github.com/maevsi/maevsi/commit/d030af4b274a88edb02a549da5b6f643c851c84f))
* **card:** remove duplicate class name ([37769f6](https://github.com/maevsi/maevsi/commit/37769f69ab89ae2e27f65745e4f275582d6a4102))
* compute data where required ([daf0e0e](https://github.com/maevsi/maevsi/commit/daf0e0e6fb0af5929371fc426e0e8048b7972b99))
* **header:** compute store property ([393a628](https://github.com/maevsi/maevsi/commit/393a628608e81911df12ee5802c29bffc5487aba))
* **image-upload-gallery:** resolve jwt ref ([b46d0ff](https://github.com/maevsi/maevsi/commit/b46d0ffacfc0818f7257c3a38710ee57a6764998))
* **pages:** correct locale-path import ([526d223](https://github.com/maevsi/maevsi/commit/526d223ca75ebac9925071989f2008265ef3a2bc))
* resolve code scanning issues ([9b96d65](https://github.com/maevsi/maevsi/commit/9b96d651299ffecb1e7e1dc9c0299213d90dc369))
* **sign-in:** compute route query property ([19e9fe9](https://github.com/maevsi/maevsi/commit/19e9fe991d6b760d096feec7309d872b1d741257))
* **tusd:** use staging host ([e42ee93](https://github.com/maevsi/maevsi/commit/e42ee934cf50eb938713e148f249276f25fcf3b7))


### Features

* **pages:** remove title validation ([5e81b50](https://github.com/maevsi/maevsi/commit/5e81b5048cf2c7f1612116b5e8f58388d6e0b1cd))

# [1.0.0-alpha.8](https://github.com/maevsi/maevsi/compare/1.0.0-alpha.7...1.0.0-alpha.8) (2022-11-01)


### Bug Fixes

* **middleware:** use validation only ([ab7aee9](https://github.com/maevsi/maevsi/commit/ab7aee9efeb4917fe71b70e895d06c4bb63576c7))
* **scripts:** fix invalid shell in dev.sh ([71e0a8a](https://github.com/maevsi/maevsi/commit/71e0a8a68a7ab903b2cdcdc6fbbb40ada8dea259))

# [1.0.0-alpha.7](https://github.com/maevsi/maevsi/compare/1.0.0-alpha.6...1.0.0-alpha.7) (2022-11-01)


### Bug Fixes

* **breadcrumb:** fixed routing in breadcrumbs ([93ab582](https://github.com/maevsi/maevsi/commit/93ab5820419f319c5aa6633370df48802f9b472d))

# [1.0.0-alpha.6](https://github.com/maevsi/maevsi/compare/1.0.0-alpha.5...1.0.0-alpha.6) (2022-10-31)


### Performance Improvements

* **dev:** do not create certificates without need ([86a0120](https://github.com/maevsi/maevsi/commit/86a012088e49e6288979fdf68adbf5a8f3761f26))

# [1.0.0-alpha.5](https://github.com/maevsi/maevsi/compare/1.0.0-alpha.4...1.0.0-alpha.5) (2022-10-28)


### Bug Fixes

* **api:** add missing import ([f58cbd0](https://github.com/maevsi/maevsi/commit/f58cbd0ea6c8e5271dbfb65ec78e46f24f6ff207))
* **event:** correct page validation ([2f4e360](https://github.com/maevsi/maevsi/commit/2f4e360a1d209958f90f92851c006ff045423005))
* **server:** add event handler wrapper ([39925c4](https://github.com/maevsi/maevsi/commit/39925c43b3ab2e1273bfafed50ad1312679e410f))


### Features

* **auth:** use parameter objects ([4f2e33a](https://github.com/maevsi/maevsi/commit/4f2e33a31636771d6537ee0b0115e7e72736d969))
* separate stack development ([59bf267](https://github.com/maevsi/maevsi/commit/59bf2670dec079f4882b6ca9bf375e430ee383fc))

# [1.0.0-alpha.4](https://github.com/maevsi/maevsi/compare/1.0.0-alpha.3...1.0.0-alpha.4) (2022-10-27)


### Bug Fixes

* **breadcrumbs:** migrate append property to function ([e4ea575](https://github.com/maevsi/maevsi/commit/e4ea57596d6468dfb17b5516e790bb61ab861bb9))
* **icon:** correct container name ([4765012](https://github.com/maevsi/maevsi/commit/4765012ca583348f7f9d279d9aae545d2cbe16cc))
* **loader:** correct property requirements ([bf02d66](https://github.com/maevsi/maevsi/commit/bf02d6689152e5125b494cd7551e4d1b551637eb))


### Features

* **cypress:** add page tests ([2370a27](https://github.com/maevsi/maevsi/commit/2370a27efe18fdf03eaa18e09826736fd0fce76e))

# [1.0.0-alpha.3](https://github.com/maevsi/maevsi/compare/1.0.0-alpha.2...1.0.0-alpha.3) (2022-10-26)


### Bug Fixes

* **tests:** use cypress environment variables ([4b65bf4](https://github.com/maevsi/maevsi/commit/4b65bf4b6f9c086713a7c370246525eb0413f7bc))


### Features

* **pages:** correct meta redirects ([d1ce421](https://github.com/maevsi/maevsi/commit/d1ce421dedb3b1be9d0870d84b238d3928f3b197))
* **tests:** add integration tests - check if page loads ([8010c8d](https://github.com/maevsi/maevsi/commit/8010c8dd93a077d2a013beefcf9717723f312f3e))

# [1.0.0-alpha.2](https://github.com/maevsi/maevsi/compare/1.0.0-alpha.1...1.0.0-alpha.2) (2022-10-26)


### Bug Fixes

* **error:** add missing layout ([b7eb034](https://github.com/maevsi/maevsi/commit/b7eb034d80dda52940348e9e99e648d0e846bbc2))
* **i18n:** add missing tags ([ba64bc8](https://github.com/maevsi/maevsi/commit/ba64bc893958b747eb0ece09477eb0c43f41928d))


### Features

* **app:** remove wrapping divs ([fd5fa96](https://github.com/maevsi/maevsi/commit/fd5fa96702c98e9db55d940f7b4a95a287443eb1))

# [1.0.0-alpha.1](https://github.com/maevsi/maevsi/compare/0.146.6...1.0.0-alpha.1) (2022-10-18)


### Bug Fixes

* :bug: fix menu being empty in between tablet and phone breakpoint ([c6b4cb8](https://github.com/maevsi/maevsi/commit/c6b4cb8cfa273292bb3aa6db0e9534b256f27af8))
* **🫖:** workaround file name issue ([16b7a87](https://github.com/maevsi/maevsi/commit/16b7a879bec81f77c020a87375ee8b57e70749e3))
* **api-data:** correct refs ([9a3d1b3](https://github.com/maevsi/maevsi/commit/9a3d1b326d58b3d194e147e0280af9088751aed5))
* **apollo:** add provider to app ([ac38f78](https://github.com/maevsi/maevsi/commit/ac38f7828e8d4cb2c198f6f270fafe251391305f))
* **attendance:** temporarily disable async component ([c5cddc6](https://github.com/maevsi/maevsi/commit/c5cddc63df7e7bc057097c601a29b5d11cd8eaaf))
* **auth:** correct ssr ([ea51469](https://github.com/maevsi/maevsi/commit/ea514691379724d2c231ea04550f88c9d6c34851))
* **auth:** correct urql ref value ([91a4bd6](https://github.com/maevsi/maevsi/commit/91a4bd6c553ca4d0d5b16c9a0e4b7b39509a8979))
* **auth:** remove leftover debugger statement ([1c4df85](https://github.com/maevsi/maevsi/commit/1c4df8501ace4c41a977df911ac3919cdaf64bb8))
* **build:** pin htmlparser2 ([42e7300](https://github.com/maevsi/maevsi/commit/42e73009b2287f81f3499720d084697031ef8567))
* **button-icon:** remove duplicate class ([3406345](https://github.com/maevsi/maevsi/commit/3406345c95631024b64fafa079760fe469ecee41))
* **button:** correct type typing ([202176c](https://github.com/maevsi/maevsi/commit/202176cc32296ca672ccdbb814c2bb82f75de54a))
* **chartjs:** workaround import issue ([d1fac59](https://github.com/maevsi/maevsi/commit/d1fac59774d785f1a00362a906d4151afb3dd30f))
* **components:** correct imports ([50254e1](https://github.com/maevsi/maevsi/commit/50254e13f37a445f0dea3816e24bda7b95dfe0b0))
* **components:** correct svg import path ([74f39af](https://github.com/maevsi/maevsi/commit/74f39af93c8401fdef9ccdd9e7fc891d40b6d9fd))
* **components:** correct svg import path ([ed84e7c](https://github.com/maevsi/maevsi/commit/ed84e7cc9bd94326fbac839d58d77d815ffde4e4))
* **components:** correct svg imports ([d61c4e8](https://github.com/maevsi/maevsi/commit/d61c4e8f274dc6d18b2171cec7ba70cdf5ea8ed4))
* **composables:** extract host getter ([7c3b402](https://github.com/maevsi/maevsi/commit/7c3b4029a5c99ae372069231f1615043b620f82f))
* **config:** correct storybook typing ([32a79be](https://github.com/maevsi/maevsi/commit/32a79be52f33a206f934161be95e49eeeefa862c))
* **constants:** extract from config ([dc1c093](https://github.com/maevsi/maevsi/commit/dc1c0936723f1ee955cf65452609b2c0ec2839d9))
* correct cjs imports ([44f5291](https://github.com/maevsi/maevsi/commit/44f5291a2dd997e4f17d4fec23fbc890d2ab84fb))
* correct imports ([7ac3815](https://github.com/maevsi/maevsi/commit/7ac38159932880d0fc25033266b80c4640db420d))
* correct types ([5a1b44b](https://github.com/maevsi/maevsi/commit/5a1b44ba8e9f120a80f2b662e08de655777dd0c7))
* correct typing ([f199316](https://github.com/maevsi/maevsi/commit/f199316c2a7ccd7c5f6d41e7e2d7667f9759bf5d))
* **croppa:** use vue 3 installation ([5d6e3d5](https://github.com/maevsi/maevsi/commit/5d6e3d5088bf38d3c26799af4a8ece13119be1e7))
* **csp:** allow development websocket ([6d1fefd](https://github.com/maevsi/maevsi/commit/6d1fefdb3b0785d28369a29fb23077f59ea0b67e))
* **deps:** downgrade vue-tsc ([f5dc77c](https://github.com/maevsi/maevsi/commit/f5dc77c172d39e0ba5aeff5814b4c9d7bae2fefe))
* **deps:** migrate to h3 v0.8 ([fe97b32](https://github.com/maevsi/maevsi/commit/fe97b320a53f03fa0983193ad4b57908d3eddadf))
* **deps:** upgrade @nuxtjs/robots to v3 ([44ffe30](https://github.com/maevsi/maevsi/commit/44ffe3089496a2f2301df918d3b1e277ca229dee))
* **docker:** add mkcert to development stage ([640af9e](https://github.com/maevsi/maevsi/commit/640af9e4bc0ce213911997f6f80abad7b78d9bf2))
* **docker:** copy cypress binary ([8096072](https://github.com/maevsi/maevsi/commit/8096072be13f7fc05ec3e7cfb39746f0b0d816b4))
* **docker:** increase timeout ([1ec78d9](https://github.com/maevsi/maevsi/commit/1ec78d98cbfae93889dc65b0bd5e332ea05325d2))
* **docker:** move development certificate generation to nuxt ([8d1b43f](https://github.com/maevsi/maevsi/commit/8d1b43f0eec7913b876b2d55353c9e4c39a0e9fe))
* **docker:** set host ([6190749](https://github.com/maevsi/maevsi/commit/61907496be49d83d64fa5e01e447a696d403fa42))
* **docker:** temporarily disable storybook ([2f7115f](https://github.com/maevsi/maevsi/commit/2f7115fc53ba3fc0c1cbf2cdf23bdfc1b88ba975))
* **drop-down:** use Vue 3's `nextTick` ([88cded5](https://github.com/maevsi/maevsi/commit/88cded556945b0d3b9ab7c451262a66772e37cb5))
* **event-list:** correct classes ([32813ec](https://github.com/maevsi/maevsi/commit/32813ec00863beb118c8cff9140e2c933134aa68))
* **events:** use methods for event handling ([e06ca82](https://github.com/maevsi/maevsi/commit/e06ca828b639990835b6bbba544821b6f6fc468c))
* **footer:** correct language selection ([47bf826](https://github.com/maevsi/maevsi/commit/47bf826908bac1809feed028653840b52afb3eaa))
* **footer:** use button instead of link ([a3a559a](https://github.com/maevsi/maevsi/commit/a3a559a419164efd07fb3ba8cb4c620f91833d34))
* **form-input:** correct validity check ([30ab99a](https://github.com/maevsi/maevsi/commit/30ab99a02c928f401d46f56c1f06a06b1131bc70))
* **form:** correct validation typing ([aaedfc6](https://github.com/maevsi/maevsi/commit/aaedfc60cbb8804ceafd2f8e75f85e1266eb0c5b))
* **form:** migrate sign-in to script setup ([bedd0f3](https://github.com/maevsi/maevsi/commit/bedd0f3e0d0140fa34c54103370a829bbebd5cdb))
* **graphql:** correct postgres error code typing ([8004ad4](https://github.com/maevsi/maevsi/commit/8004ad42c8bfcf36a129b1a19c158b14b09ceec0))
* **head:** correct imports ([181b0f9](https://github.com/maevsi/maevsi/commit/181b0f94f87fe70f7e3bd20c0b8ae3f088a08c11))
* **header:** allow connect-src self ([1650e01](https://github.com/maevsi/maevsi/commit/1650e019f803bf310fe8e8961722c6498c849906))
* **headers:** add connect-src csp for http ([f61f321](https://github.com/maevsi/maevsi/commit/f61f32141146da7b9776af470824b067872e269c))
* **headers:** temporarily disable trusted types ([d62ac8c](https://github.com/maevsi/maevsi/commit/d62ac8ce0459466e5b6ff093f3f743411c686278))
* **i18n:** add missing vite plugin ([59643e2](https://github.com/maevsi/maevsi/commit/59643e2f813b851f3506790e5f1033accd97e691))
* **i18n:** correct moment usage ([8b05be2](https://github.com/maevsi/maevsi/commit/8b05be2971dabf5394c7eb7d3369d9dca188462c))
* **i18n:** escape [@s](https://github.com/s) ([172e000](https://github.com/maevsi/maevsi/commit/172e000c5e8e2ed7f0f340c3a679668766234096))
* **i18n:** exclude node_modules ([29cac6c](https://github.com/maevsi/maevsi/commit/29cac6c686f3bb13db384c82809e9a26852962e0))
* **i18n:** migrate ([e499af5](https://github.com/maevsi/maevsi/commit/e499af5d42fbf74022cef8a20a08de92bcb9ef67))
* **icon:** declare property variables in plain script block ([9d925ff](https://github.com/maevsi/maevsi/commit/9d925ff0c523127dde79c58a20fa6b9605d7cbe0))
* **icon:** set default title in html ([3aa09a4](https://github.com/maevsi/maevsi/commit/3aa09a43589efc1bf0f4e0710618b3717ab3ac11))
* **icons:** readd title prop ([414471c](https://github.com/maevsi/maevsi/commit/414471c5433aaa8e6ae15e54f3f467f0c6a11d47))
* **image-upload-gallery:** use url for import ([87d4e60](https://github.com/maevsi/maevsi/commit/87d4e60c3a6a64648339ace1554c95290944802d))
* **invitation:** remove unused $pinia usage ([63f0a10](https://github.com/maevsi/maevsi/commit/63f0a10c7f85d1c7251c2c67c160f613738355db))
* **layout:** correct head ([8534e78](https://github.com/maevsi/maevsi/commit/8534e782747a21a5e26038d7f6686877474ee04a))
* **layout:** use head as composable ([fcdfa5a](https://github.com/maevsi/maevsi/commit/fcdfa5aa38616f641873a167ff2c77fcbea0f1ad))
* **loader-image:** migrate to script setup ([21935d0](https://github.com/maevsi/maevsi/commit/21935d0bb704d96e00110e8e77ab2ce9f37540a5))
* **loader:** initialize with empty array ([ea75ea9](https://github.com/maevsi/maevsi/commit/ea75ea906e9c1cc0f99f6a60853bb9728cf513a6))
* **moment:** workaround yet incompatible module ([fb1b7a7](https://github.com/maevsi/maevsi/commit/fb1b7a7135ea005d2ffe4126541dfb7a38e837f4))
* **nuxt:** correct base url ([f2a4b12](https://github.com/maevsi/maevsi/commit/f2a4b12f03698bbeef3bbb30377a67197b87a84a))
* **nuxt:** remove global event bus ([ac4c7a0](https://github.com/maevsi/maevsi/commit/ac4c7a038c7e2f314073a8f25ae5234177b4f9e1))
* **nuxt:** switch to edge to be able to use dev ([b088775](https://github.com/maevsi/maevsi/commit/b0887754fd3495f148d545c2e544420c1c63885c))
* **nuxt:** use host 0.0.0.0 ([9fc53b9](https://github.com/maevsi/maevsi/commit/9fc53b91e2f093d42a82919337839cc4f3b6e200))
* **package:** add missing import ([647edba](https://github.com/maevsi/maevsi/commit/647edbae8d1cdfbf3e820512660ffdca2ccd719d))
* **pages:** use auto imports ([4a15ea7](https://github.com/maevsi/maevsi/commit/4a15ea7989eee0bda6277e3cad4f513cf30a9bfd))
* **pages:** workaround locale-path issue ([259873e](https://github.com/maevsi/maevsi/commit/259873e5966d86e61b0466f7245f7c5f68bab0b9))
* **plugins:** remove nuxt 2 context ([1f6a133](https://github.com/maevsi/maevsi/commit/1f6a133482528df294b0c47d1fa1f3ba18bc75fd))
* **pnpm:** hoist shamefully ([e04aaed](https://github.com/maevsi/maevsi/commit/e04aaedbab3f9253f8d875bdfd119cd440ad4d2a))
* **pnpm:** temporarily allow lax peer dependencies ([6470d6e](https://github.com/maevsi/maevsi/commit/6470d6e6817706e7f0b371778f68d96ad7372d86))
* **qrcode-stream:** use async component ([583da2f](https://github.com/maevsi/maevsi/commit/583da2f90db66ece5390e0f83333a0c7eca919a0))
* **robots:** add hardcoded file as a workaround ([f31ca22](https://github.com/maevsi/maevsi/commit/f31ca228b7ba485b7bc55c9dcdda2da80205c42e))
* **robots:** hide warning ([9798944](https://github.com/maevsi/maevsi/commit/9798944b75d0b396dc7a1655e12928b9a56a9b3a))
* **script:** add missing languages ([d2abccc](https://github.com/maevsi/maevsi/commit/d2abcccf4ed8f2d552f7ab55a620433098487aa1))
* **sitemap:** hardcode ([b6ed030](https://github.com/maevsi/maevsi/commit/b6ed030d793a8561af6f44f27991ebb7fb3e9af4))
* **sqitch:** remove stashed test data ([4420f7a](https://github.com/maevsi/maevsi/commit/4420f7a33f7554a4bbdff3fadbc02c861a1e626e))
* **storybook:** disable temporarily ([309f264](https://github.com/maevsi/maevsi/commit/309f264dbe994ffa2d9be7d4b2b807a3ae96674c))
* **tailwind:** exclude nuxt config ([1bc6532](https://github.com/maevsi/maevsi/commit/1bc6532846c0fdbc62cf4fd63f70bd94e49f7c74))
* **ts:** use named imports ([98ace81](https://github.com/maevsi/maevsi/commit/98ace81fafba744ba1181a9db8c596f5f8d4e69b))
* **types:** add missing types ([9f63ec2](https://github.com/maevsi/maevsi/commit/9f63ec2c5558112618e726daad26349fa4426f27))
* **urql:** temporarily disable ssr ([0fe17ae](https://github.com/maevsi/maevsi/commit/0fe17aed6c6abbeeee7e469d6a435250449f8f60))
* **urql:** temporarily disable urql type checking ([6ef8c89](https://github.com/maevsi/maevsi/commit/6ef8c89bc0440a28d30a87e7ec93726fc975cecf))
* **vite:** add gql rollup plugin ([df2d881](https://github.com/maevsi/maevsi/commit/df2d881eb6d934e40892248bc80d68600aee4c00))
* **vue-qrcode-reader:** switch to fork ([47e097d](https://github.com/maevsi/maevsi/commit/47e097db55a0a9881deac2cf311912cecfb9b21c))
* **vuelidate:** correct validation ([c23c14c](https://github.com/maevsi/maevsi/commit/c23c14cc7d71fcfb1cf4b57cc17a7dbb9470087d))


### chore

* add breaking change ([b9006ae](https://github.com/maevsi/maevsi/commit/b9006ae0066600d7194e4269976b9a0accb408ec))


### Features

* :sparkles: add title prop to icons ([c4b9691](https://github.com/maevsi/maevsi/commit/c4b969190c7e7c6e3ff68be953721dd0b124256f))
* add cypress ([f8d5cf6](https://github.com/maevsi/maevsi/commit/f8d5cf6a7649c91e46bd264b5a3d890058575647))
* **apollo:** complete own plugin ([492a23f](https://github.com/maevsi/maevsi/commit/492a23f90ba71612558b565ef9cc0651ddd395ff))
* **apollo:** remove ([135b835](https://github.com/maevsi/maevsi/commit/135b835eaa54adae43a608360e2067b9cf079dd1))
* **apollo:** upgrade ([efca0e2](https://github.com/maevsi/maevsi/commit/efca0e26824adc94233f86f49aa7ad19e2b6c3c8))
* **apollo:** use own module ([2ba7af5](https://github.com/maevsi/maevsi/commit/2ba7af5cddb6bfa3ebbf39e38b7dc0722e055e5d))
* **apollo:** use ssr ([5935190](https://github.com/maevsi/maevsi/commit/5935190bd5f8402a9f8984a879b896dfe99b425a))
* **button:** compute classes ([f326237](https://github.com/maevsi/maevsi/commit/f326237a89a0ceb9739dd7f982f6d762b28db5a2))
* **components:** migrate this usage to setup function ([a19e276](https://github.com/maevsi/maevsi/commit/a19e276735172a42472087dd75fa82963852af67))
* **components:** replace require with import ([a1eea20](https://github.com/maevsi/maevsi/commit/a1eea20c65d8c28462869b5b4306ea099628e5fb))
* **components:** use default ids for common form inputs ([a569c7a](https://github.com/maevsi/maevsi/commit/a569c7aaa2c388107adf7832c6fc898b8785d81c))
* **config:** rename development indicator ([8151fe0](https://github.com/maevsi/maevsi/commit/8151fe03dee5bea42a003138a7f49b2400cdfdd9))
* **config:** rename storybook indicator ([c41ed29](https://github.com/maevsi/maevsi/commit/c41ed2922d95b4b0b08eb7024f5b05fb9ca27435))
* **cookie:** temporarily disable cookie control ([2a44430](https://github.com/maevsi/maevsi/commit/2a444306e4e659ba82fe3f342eaa9df599cca5d9))
* deprecate stack domain and base url ([a570a87](https://github.com/maevsi/maevsi/commit/a570a87d4c6703f183d0b399af66d8c2becb9f64))
* **event-group:** remove temporarily ([626e031](https://github.com/maevsi/maevsi/commit/626e031451c19840605a88c3109591933d5475d0))
* **event-list:** migrate to urql ([45e74ac](https://github.com/maevsi/maevsi/commit/45e74ac32dd61398c210ef7505e9bf8d1c06c608))
* **form-delete:** migrate to urql ([ced1df6](https://github.com/maevsi/maevsi/commit/ced1df616c8bd634473fea8a1ef03e1df1d3cb72))
* **form-delete:** unwrap app ([c4055a4](https://github.com/maevsi/maevsi/commit/c4055a4d8753d6f7292e1ef264ea5281ffdf5dc9))
* **gql:** use after-pagination ([30e892e](https://github.com/maevsi/maevsi/commit/30e892e7d7d955a1120d0c714322203ed4e1e909))
* **graphql:** add devtools ([6b208c7](https://github.com/maevsi/maevsi/commit/6b208c7f030d3052906e1faf594944901358497a))
* **head:** add composables ([8d4d5e1](https://github.com/maevsi/maevsi/commit/8d4d5e1e4f7fd7cb0fe95350c80ffbfba6f68946))
* **headers:** disable deprecated expect-ct ([1b1e692](https://github.com/maevsi/maevsi/commit/1b1e692708b28e0f9ef8e7147154181df9a37675))
* **head:** migrate to new specification ([8f6eedd](https://github.com/maevsi/maevsi/commit/8f6eedd191ce08a950d92cac1f94c0cebd6d5cb6))
* **i18n:** migrate to new component syntax ([fe65ebb](https://github.com/maevsi/maevsi/commit/fe65ebb36fa6b88f3dce97f585ba68497bf60605))
* **i18n:** migrate to translation function ([a2c81d4](https://github.com/maevsi/maevsi/commit/a2c81d430e10ef74b321909561636dc332bd9259))
* **image-upload-gallery:** migrate ([6eb62fc](https://github.com/maevsi/maevsi/commit/6eb62fc2fc35e7b6c317a0fb9c479d741722d91b))
* implement feedback on english translations ([4e2061a](https://github.com/maevsi/maevsi/commit/4e2061a2e6b6188ff4861a316f811ed6bdd2c96a))
* improve english translations ([0df0b26](https://github.com/maevsi/maevsi/commit/0df0b2643fcaf0e2315c0b5d0810bdead8efc1d3))
* **index:** revert one i18n change ([21a73df](https://github.com/maevsi/maevsi/commit/21a73df751c6afe3513352d647b37917a4cfce0a))
* **jwt:** migrate to jose ([0f1876f](https://github.com/maevsi/maevsi/commit/0f1876fba788797d574ecd2cda71b40ad11c5e2e))
* migrate to new slot syntax ([9cf6204](https://github.com/maevsi/maevsi/commit/9cf6204b19c53b7b5d9ba49320cbd981f591203e))
* **nitro:** enable compression for public assets ([5fd52fa](https://github.com/maevsi/maevsi/commit/5fd52fabbc34c534296c95846f07735133c81639))
* **nuxt-i18n:** add vue-i18n-composable ([4ef2139](https://github.com/maevsi/maevsi/commit/4ef21393589da701f15e22d8289da923c1ea07c1))
* **nuxt:** add html validator module ([d57874f](https://github.com/maevsi/maevsi/commit/d57874fb799723709ab1a2f0fd542cc587fa1baa))
* **nuxt:** disable aliases ([70e153f](https://github.com/maevsi/maevsi/commit/70e153fce547aa901f5c2f8568291b3644649357))
* **nuxt:** enable https ([4007a4a](https://github.com/maevsi/maevsi/commit/4007a4a2e7528415babe99eef8dfd23c391d71ed))
* **package:** migrate to module ([39ed308](https://github.com/maevsi/maevsi/commit/39ed3087a2c317e9321e7649d212d55881195299))
* **package:** set version to alpha.0 ([87b7306](https://github.com/maevsi/maevsi/commit/87b73066e72232f1300c89e47e10d0b2316f62f6))
* **pages:** use generated queries ([67d4b80](https://github.com/maevsi/maevsi/commit/67d4b800664d2014f6d9eb796eca67017be14a0a))
* remove storybook ([f34b4fb](https://github.com/maevsi/maevsi/commit/f34b4fbdf0da4230e649b46586bfe32acd54ee45))
* remove unnecessary imports ([0a5886a](https://github.com/maevsi/maevsi/commit/0a5886a8917819e676272b4799c2c657904349bc))
* replace apollo with urql usage, generate code ([790dc82](https://github.com/maevsi/maevsi/commit/790dc82658f43f8f3db1e140eeb1fdd8242e609a))
* stash ([52b2fbe](https://github.com/maevsi/maevsi/commit/52b2fbed621f8aef337dcfbd50c60451083fe33a))
* **store:** replace vuex with pinia ([a005459](https://github.com/maevsi/maevsi/commit/a005459ba991242f39c7b385b6f1b5ba16c406ec))
* **tusd:** add composable ([32db139](https://github.com/maevsi/maevsi/commit/32db1393d2c118d8734b82c3b67044b9e74d7a17))
* **urql:** enable ssr hooks ([0021733](https://github.com/maevsi/maevsi/commit/0021733666a9185a2770883bdf574045490cab55))
* **urql:** use network only request policy ([bf7e3de](https://github.com/maevsi/maevsi/commit/bf7e3ded993a896607ab08ddfd68c48a71e50b59))
* **vuelidate:** migrate to v2 ([123bf46](https://github.com/maevsi/maevsi/commit/123bf46833ef9e530e2ace73a27f1edde4bfef2f))


### Reverts

* Revert "Merge branch 'feat/apollo-upgrade' into feat/vue-3" ([6903451](https://github.com/maevsi/maevsi/commit/6903451f67e5f4a9ff5de47f427146f4a46cea4a))


### BREAKING CHANGES

* prepare v1

# [0.147.0](https://github.com/maevsi/maevsi/compare/0.146.6...0.147.0) (2022-10-17)


### Bug Fixes

* :bug: fix menu being empty in between tablet and phone breakpoint ([c6b4cb8](https://github.com/maevsi/maevsi/commit/c6b4cb8cfa273292bb3aa6db0e9534b256f27af8))
* **🫖:** workaround file name issue ([16b7a87](https://github.com/maevsi/maevsi/commit/16b7a879bec81f77c020a87375ee8b57e70749e3))
* **api-data:** correct refs ([9a3d1b3](https://github.com/maevsi/maevsi/commit/9a3d1b326d58b3d194e147e0280af9088751aed5))
* **apollo:** add provider to app ([ac38f78](https://github.com/maevsi/maevsi/commit/ac38f7828e8d4cb2c198f6f270fafe251391305f))
* **attendance:** temporarily disable async component ([c5cddc6](https://github.com/maevsi/maevsi/commit/c5cddc63df7e7bc057097c601a29b5d11cd8eaaf))
* **auth:** correct ssr ([ea51469](https://github.com/maevsi/maevsi/commit/ea514691379724d2c231ea04550f88c9d6c34851))
* **auth:** correct urql ref value ([91a4bd6](https://github.com/maevsi/maevsi/commit/91a4bd6c553ca4d0d5b16c9a0e4b7b39509a8979))
* **auth:** remove leftover debugger statement ([1c4df85](https://github.com/maevsi/maevsi/commit/1c4df8501ace4c41a977df911ac3919cdaf64bb8))
* **build:** pin htmlparser2 ([42e7300](https://github.com/maevsi/maevsi/commit/42e73009b2287f81f3499720d084697031ef8567))
* **button-icon:** remove duplicate class ([3406345](https://github.com/maevsi/maevsi/commit/3406345c95631024b64fafa079760fe469ecee41))
* **button:** correct type typing ([202176c](https://github.com/maevsi/maevsi/commit/202176cc32296ca672ccdbb814c2bb82f75de54a))
* **chartjs:** workaround import issue ([d1fac59](https://github.com/maevsi/maevsi/commit/d1fac59774d785f1a00362a906d4151afb3dd30f))
* **components:** correct imports ([50254e1](https://github.com/maevsi/maevsi/commit/50254e13f37a445f0dea3816e24bda7b95dfe0b0))
* **components:** correct svg import path ([74f39af](https://github.com/maevsi/maevsi/commit/74f39af93c8401fdef9ccdd9e7fc891d40b6d9fd))
* **components:** correct svg import path ([ed84e7c](https://github.com/maevsi/maevsi/commit/ed84e7cc9bd94326fbac839d58d77d815ffde4e4))
* **components:** correct svg imports ([d61c4e8](https://github.com/maevsi/maevsi/commit/d61c4e8f274dc6d18b2171cec7ba70cdf5ea8ed4))
* **composables:** extract host getter ([7c3b402](https://github.com/maevsi/maevsi/commit/7c3b4029a5c99ae372069231f1615043b620f82f))
* **config:** correct storybook typing ([32a79be](https://github.com/maevsi/maevsi/commit/32a79be52f33a206f934161be95e49eeeefa862c))
* **constants:** extract from config ([dc1c093](https://github.com/maevsi/maevsi/commit/dc1c0936723f1ee955cf65452609b2c0ec2839d9))
* correct cjs imports ([44f5291](https://github.com/maevsi/maevsi/commit/44f5291a2dd997e4f17d4fec23fbc890d2ab84fb))
* correct imports ([7ac3815](https://github.com/maevsi/maevsi/commit/7ac38159932880d0fc25033266b80c4640db420d))
* correct types ([5a1b44b](https://github.com/maevsi/maevsi/commit/5a1b44ba8e9f120a80f2b662e08de655777dd0c7))
* correct typing ([f199316](https://github.com/maevsi/maevsi/commit/f199316c2a7ccd7c5f6d41e7e2d7667f9759bf5d))
* **croppa:** use vue 3 installation ([5d6e3d5](https://github.com/maevsi/maevsi/commit/5d6e3d5088bf38d3c26799af4a8ece13119be1e7))
* **csp:** allow development websocket ([6d1fefd](https://github.com/maevsi/maevsi/commit/6d1fefdb3b0785d28369a29fb23077f59ea0b67e))
* **deps:** downgrade vue-tsc ([f5dc77c](https://github.com/maevsi/maevsi/commit/f5dc77c172d39e0ba5aeff5814b4c9d7bae2fefe))
* **deps:** migrate to h3 v0.8 ([fe97b32](https://github.com/maevsi/maevsi/commit/fe97b320a53f03fa0983193ad4b57908d3eddadf))
* **deps:** upgrade @nuxtjs/robots to v3 ([44ffe30](https://github.com/maevsi/maevsi/commit/44ffe3089496a2f2301df918d3b1e277ca229dee))
* **docker:** add mkcert to development stage ([640af9e](https://github.com/maevsi/maevsi/commit/640af9e4bc0ce213911997f6f80abad7b78d9bf2))
* **docker:** copy cypress binary ([8096072](https://github.com/maevsi/maevsi/commit/8096072be13f7fc05ec3e7cfb39746f0b0d816b4))
* **docker:** increase timeout ([1ec78d9](https://github.com/maevsi/maevsi/commit/1ec78d98cbfae93889dc65b0bd5e332ea05325d2))
* **docker:** move development certificate generation to nuxt ([8d1b43f](https://github.com/maevsi/maevsi/commit/8d1b43f0eec7913b876b2d55353c9e4c39a0e9fe))
* **docker:** set host ([6190749](https://github.com/maevsi/maevsi/commit/61907496be49d83d64fa5e01e447a696d403fa42))
* **docker:** temporarily disable storybook ([2f7115f](https://github.com/maevsi/maevsi/commit/2f7115fc53ba3fc0c1cbf2cdf23bdfc1b88ba975))
* **drop-down:** use Vue 3's `nextTick` ([88cded5](https://github.com/maevsi/maevsi/commit/88cded556945b0d3b9ab7c451262a66772e37cb5))
* **event-list:** correct classes ([32813ec](https://github.com/maevsi/maevsi/commit/32813ec00863beb118c8cff9140e2c933134aa68))
* **events:** use methods for event handling ([e06ca82](https://github.com/maevsi/maevsi/commit/e06ca828b639990835b6bbba544821b6f6fc468c))
* **footer:** correct language selection ([47bf826](https://github.com/maevsi/maevsi/commit/47bf826908bac1809feed028653840b52afb3eaa))
* **footer:** use button instead of link ([a3a559a](https://github.com/maevsi/maevsi/commit/a3a559a419164efd07fb3ba8cb4c620f91833d34))
* **form-input:** correct validity check ([30ab99a](https://github.com/maevsi/maevsi/commit/30ab99a02c928f401d46f56c1f06a06b1131bc70))
* **form:** correct validation typing ([aaedfc6](https://github.com/maevsi/maevsi/commit/aaedfc60cbb8804ceafd2f8e75f85e1266eb0c5b))
* **form:** migrate sign-in to script setup ([bedd0f3](https://github.com/maevsi/maevsi/commit/bedd0f3e0d0140fa34c54103370a829bbebd5cdb))
* **graphql:** correct postgres error code typing ([8004ad4](https://github.com/maevsi/maevsi/commit/8004ad42c8bfcf36a129b1a19c158b14b09ceec0))
* **head:** correct imports ([181b0f9](https://github.com/maevsi/maevsi/commit/181b0f94f87fe70f7e3bd20c0b8ae3f088a08c11))
* **header:** allow connect-src self ([1650e01](https://github.com/maevsi/maevsi/commit/1650e019f803bf310fe8e8961722c6498c849906))
* **headers:** add connect-src csp for http ([f61f321](https://github.com/maevsi/maevsi/commit/f61f32141146da7b9776af470824b067872e269c))
* **headers:** temporarily disable trusted types ([d62ac8c](https://github.com/maevsi/maevsi/commit/d62ac8ce0459466e5b6ff093f3f743411c686278))
* **i18n:** add missing vite plugin ([59643e2](https://github.com/maevsi/maevsi/commit/59643e2f813b851f3506790e5f1033accd97e691))
* **i18n:** correct moment usage ([8b05be2](https://github.com/maevsi/maevsi/commit/8b05be2971dabf5394c7eb7d3369d9dca188462c))
* **i18n:** escape [@s](https://github.com/s) ([172e000](https://github.com/maevsi/maevsi/commit/172e000c5e8e2ed7f0f340c3a679668766234096))
* **i18n:** exclude node_modules ([29cac6c](https://github.com/maevsi/maevsi/commit/29cac6c686f3bb13db384c82809e9a26852962e0))
* **i18n:** migrate ([e499af5](https://github.com/maevsi/maevsi/commit/e499af5d42fbf74022cef8a20a08de92bcb9ef67))
* **icon:** declare property variables in plain script block ([9d925ff](https://github.com/maevsi/maevsi/commit/9d925ff0c523127dde79c58a20fa6b9605d7cbe0))
* **icon:** set default title in html ([3aa09a4](https://github.com/maevsi/maevsi/commit/3aa09a43589efc1bf0f4e0710618b3717ab3ac11))
* **icons:** readd title prop ([414471c](https://github.com/maevsi/maevsi/commit/414471c5433aaa8e6ae15e54f3f467f0c6a11d47))
* **image-upload-gallery:** use url for import ([87d4e60](https://github.com/maevsi/maevsi/commit/87d4e60c3a6a64648339ace1554c95290944802d))
* **invitation:** remove unused $pinia usage ([63f0a10](https://github.com/maevsi/maevsi/commit/63f0a10c7f85d1c7251c2c67c160f613738355db))
* **layout:** correct head ([8534e78](https://github.com/maevsi/maevsi/commit/8534e782747a21a5e26038d7f6686877474ee04a))
* **layout:** use head as composable ([fcdfa5a](https://github.com/maevsi/maevsi/commit/fcdfa5aa38616f641873a167ff2c77fcbea0f1ad))
* **loader-image:** migrate to script setup ([21935d0](https://github.com/maevsi/maevsi/commit/21935d0bb704d96e00110e8e77ab2ce9f37540a5))
* **loader:** initialize with empty array ([ea75ea9](https://github.com/maevsi/maevsi/commit/ea75ea906e9c1cc0f99f6a60853bb9728cf513a6))
* **moment:** workaround yet incompatible module ([fb1b7a7](https://github.com/maevsi/maevsi/commit/fb1b7a7135ea005d2ffe4126541dfb7a38e837f4))
* **nuxt:** correct base url ([f2a4b12](https://github.com/maevsi/maevsi/commit/f2a4b12f03698bbeef3bbb30377a67197b87a84a))
* **nuxt:** remove global event bus ([ac4c7a0](https://github.com/maevsi/maevsi/commit/ac4c7a038c7e2f314073a8f25ae5234177b4f9e1))
* **nuxt:** switch to edge to be able to use dev ([b088775](https://github.com/maevsi/maevsi/commit/b0887754fd3495f148d545c2e544420c1c63885c))
* **nuxt:** use host 0.0.0.0 ([9fc53b9](https://github.com/maevsi/maevsi/commit/9fc53b91e2f093d42a82919337839cc4f3b6e200))
* **package:** add missing import ([647edba](https://github.com/maevsi/maevsi/commit/647edbae8d1cdfbf3e820512660ffdca2ccd719d))
* **pages:** use auto imports ([4a15ea7](https://github.com/maevsi/maevsi/commit/4a15ea7989eee0bda6277e3cad4f513cf30a9bfd))
* **pages:** workaround locale-path issue ([259873e](https://github.com/maevsi/maevsi/commit/259873e5966d86e61b0466f7245f7c5f68bab0b9))
* **plugins:** remove nuxt 2 context ([1f6a133](https://github.com/maevsi/maevsi/commit/1f6a133482528df294b0c47d1fa1f3ba18bc75fd))
* **pnpm:** hoist shamefully ([e04aaed](https://github.com/maevsi/maevsi/commit/e04aaedbab3f9253f8d875bdfd119cd440ad4d2a))
* **pnpm:** temporarily allow lax peer dependencies ([6470d6e](https://github.com/maevsi/maevsi/commit/6470d6e6817706e7f0b371778f68d96ad7372d86))
* **qrcode-stream:** use async component ([583da2f](https://github.com/maevsi/maevsi/commit/583da2f90db66ece5390e0f83333a0c7eca919a0))
* **robots:** add hardcoded file as a workaround ([f31ca22](https://github.com/maevsi/maevsi/commit/f31ca228b7ba485b7bc55c9dcdda2da80205c42e))
* **robots:** hide warning ([9798944](https://github.com/maevsi/maevsi/commit/9798944b75d0b396dc7a1655e12928b9a56a9b3a))
* **script:** add missing languages ([d2abccc](https://github.com/maevsi/maevsi/commit/d2abcccf4ed8f2d552f7ab55a620433098487aa1))
* **sitemap:** hardcode ([b6ed030](https://github.com/maevsi/maevsi/commit/b6ed030d793a8561af6f44f27991ebb7fb3e9af4))
* **sqitch:** remove stashed test data ([4420f7a](https://github.com/maevsi/maevsi/commit/4420f7a33f7554a4bbdff3fadbc02c861a1e626e))
* **storybook:** disable temporarily ([309f264](https://github.com/maevsi/maevsi/commit/309f264dbe994ffa2d9be7d4b2b807a3ae96674c))
* **tailwind:** exclude nuxt config ([1bc6532](https://github.com/maevsi/maevsi/commit/1bc6532846c0fdbc62cf4fd63f70bd94e49f7c74))
* **ts:** use named imports ([98ace81](https://github.com/maevsi/maevsi/commit/98ace81fafba744ba1181a9db8c596f5f8d4e69b))
* **types:** add missing types ([9f63ec2](https://github.com/maevsi/maevsi/commit/9f63ec2c5558112618e726daad26349fa4426f27))
* **urql:** temporarily disable ssr ([0fe17ae](https://github.com/maevsi/maevsi/commit/0fe17aed6c6abbeeee7e469d6a435250449f8f60))
* **urql:** temporarily disable urql type checking ([6ef8c89](https://github.com/maevsi/maevsi/commit/6ef8c89bc0440a28d30a87e7ec93726fc975cecf))
* **vite:** add gql rollup plugin ([df2d881](https://github.com/maevsi/maevsi/commit/df2d881eb6d934e40892248bc80d68600aee4c00))
* **vue-qrcode-reader:** switch to fork ([47e097d](https://github.com/maevsi/maevsi/commit/47e097db55a0a9881deac2cf311912cecfb9b21c))
* **vuelidate:** correct validation ([c23c14c](https://github.com/maevsi/maevsi/commit/c23c14cc7d71fcfb1cf4b57cc17a7dbb9470087d))


### Features

* :sparkles: add title prop to icons ([c4b9691](https://github.com/maevsi/maevsi/commit/c4b969190c7e7c6e3ff68be953721dd0b124256f))
* add cypress ([f8d5cf6](https://github.com/maevsi/maevsi/commit/f8d5cf6a7649c91e46bd264b5a3d890058575647))
* **apollo:** complete own plugin ([492a23f](https://github.com/maevsi/maevsi/commit/492a23f90ba71612558b565ef9cc0651ddd395ff))
* **apollo:** remove ([135b835](https://github.com/maevsi/maevsi/commit/135b835eaa54adae43a608360e2067b9cf079dd1))
* **apollo:** upgrade ([efca0e2](https://github.com/maevsi/maevsi/commit/efca0e26824adc94233f86f49aa7ad19e2b6c3c8))
* **apollo:** use own module ([2ba7af5](https://github.com/maevsi/maevsi/commit/2ba7af5cddb6bfa3ebbf39e38b7dc0722e055e5d))
* **apollo:** use ssr ([5935190](https://github.com/maevsi/maevsi/commit/5935190bd5f8402a9f8984a879b896dfe99b425a))
* **button:** compute classes ([f326237](https://github.com/maevsi/maevsi/commit/f326237a89a0ceb9739dd7f982f6d762b28db5a2))
* **components:** migrate this usage to setup function ([a19e276](https://github.com/maevsi/maevsi/commit/a19e276735172a42472087dd75fa82963852af67))
* **components:** replace require with import ([a1eea20](https://github.com/maevsi/maevsi/commit/a1eea20c65d8c28462869b5b4306ea099628e5fb))
* **components:** use default ids for common form inputs ([a569c7a](https://github.com/maevsi/maevsi/commit/a569c7aaa2c388107adf7832c6fc898b8785d81c))
* **config:** rename development indicator ([8151fe0](https://github.com/maevsi/maevsi/commit/8151fe03dee5bea42a003138a7f49b2400cdfdd9))
* **config:** rename storybook indicator ([c41ed29](https://github.com/maevsi/maevsi/commit/c41ed2922d95b4b0b08eb7024f5b05fb9ca27435))
* **cookie:** temporarily disable cookie control ([2a44430](https://github.com/maevsi/maevsi/commit/2a444306e4e659ba82fe3f342eaa9df599cca5d9))
* deprecate stack domain and base url ([a570a87](https://github.com/maevsi/maevsi/commit/a570a87d4c6703f183d0b399af66d8c2becb9f64))
* **event-group:** remove temporarily ([626e031](https://github.com/maevsi/maevsi/commit/626e031451c19840605a88c3109591933d5475d0))
* **event-list:** migrate to urql ([45e74ac](https://github.com/maevsi/maevsi/commit/45e74ac32dd61398c210ef7505e9bf8d1c06c608))
* **form-delete:** migrate to urql ([ced1df6](https://github.com/maevsi/maevsi/commit/ced1df616c8bd634473fea8a1ef03e1df1d3cb72))
* **form-delete:** unwrap app ([c4055a4](https://github.com/maevsi/maevsi/commit/c4055a4d8753d6f7292e1ef264ea5281ffdf5dc9))
* **gql:** use after-pagination ([30e892e](https://github.com/maevsi/maevsi/commit/30e892e7d7d955a1120d0c714322203ed4e1e909))
* **graphql:** add devtools ([6b208c7](https://github.com/maevsi/maevsi/commit/6b208c7f030d3052906e1faf594944901358497a))
* **head:** add composables ([8d4d5e1](https://github.com/maevsi/maevsi/commit/8d4d5e1e4f7fd7cb0fe95350c80ffbfba6f68946))
* **headers:** disable deprecated expect-ct ([1b1e692](https://github.com/maevsi/maevsi/commit/1b1e692708b28e0f9ef8e7147154181df9a37675))
* **head:** migrate to new specification ([8f6eedd](https://github.com/maevsi/maevsi/commit/8f6eedd191ce08a950d92cac1f94c0cebd6d5cb6))
* **i18n:** migrate to new component syntax ([fe65ebb](https://github.com/maevsi/maevsi/commit/fe65ebb36fa6b88f3dce97f585ba68497bf60605))
* **i18n:** migrate to translation function ([a2c81d4](https://github.com/maevsi/maevsi/commit/a2c81d430e10ef74b321909561636dc332bd9259))
* **image-upload-gallery:** migrate ([6eb62fc](https://github.com/maevsi/maevsi/commit/6eb62fc2fc35e7b6c317a0fb9c479d741722d91b))
* implement feedback on english translations ([4e2061a](https://github.com/maevsi/maevsi/commit/4e2061a2e6b6188ff4861a316f811ed6bdd2c96a))
* improve english translations ([0df0b26](https://github.com/maevsi/maevsi/commit/0df0b2643fcaf0e2315c0b5d0810bdead8efc1d3))
* **index:** revert one i18n change ([21a73df](https://github.com/maevsi/maevsi/commit/21a73df751c6afe3513352d647b37917a4cfce0a))
* **jwt:** migrate to jose ([0f1876f](https://github.com/maevsi/maevsi/commit/0f1876fba788797d574ecd2cda71b40ad11c5e2e))
* migrate to new slot syntax ([9cf6204](https://github.com/maevsi/maevsi/commit/9cf6204b19c53b7b5d9ba49320cbd981f591203e))
* **nitro:** enable compression for public assets ([5fd52fa](https://github.com/maevsi/maevsi/commit/5fd52fabbc34c534296c95846f07735133c81639))
* **nuxt-i18n:** add vue-i18n-composable ([4ef2139](https://github.com/maevsi/maevsi/commit/4ef21393589da701f15e22d8289da923c1ea07c1))
* **nuxt:** add html validator module ([d57874f](https://github.com/maevsi/maevsi/commit/d57874fb799723709ab1a2f0fd542cc587fa1baa))
* **nuxt:** disable aliases ([70e153f](https://github.com/maevsi/maevsi/commit/70e153fce547aa901f5c2f8568291b3644649357))
* **nuxt:** enable https ([4007a4a](https://github.com/maevsi/maevsi/commit/4007a4a2e7528415babe99eef8dfd23c391d71ed))
* **package:** migrate to module ([39ed308](https://github.com/maevsi/maevsi/commit/39ed3087a2c317e9321e7649d212d55881195299))
* **package:** set version to alpha.0 ([87b7306](https://github.com/maevsi/maevsi/commit/87b73066e72232f1300c89e47e10d0b2316f62f6))
* **pages:** use generated queries ([67d4b80](https://github.com/maevsi/maevsi/commit/67d4b800664d2014f6d9eb796eca67017be14a0a))
* remove storybook ([f34b4fb](https://github.com/maevsi/maevsi/commit/f34b4fbdf0da4230e649b46586bfe32acd54ee45))
* remove unnecessary imports ([0a5886a](https://github.com/maevsi/maevsi/commit/0a5886a8917819e676272b4799c2c657904349bc))
* replace apollo with urql usage, generate code ([790dc82](https://github.com/maevsi/maevsi/commit/790dc82658f43f8f3db1e140eeb1fdd8242e609a))
* stash ([52b2fbe](https://github.com/maevsi/maevsi/commit/52b2fbed621f8aef337dcfbd50c60451083fe33a))
* **store:** replace vuex with pinia ([a005459](https://github.com/maevsi/maevsi/commit/a005459ba991242f39c7b385b6f1b5ba16c406ec))
* **tusd:** add composable ([32db139](https://github.com/maevsi/maevsi/commit/32db1393d2c118d8734b82c3b67044b9e74d7a17))
* **urql:** enable ssr hooks ([0021733](https://github.com/maevsi/maevsi/commit/0021733666a9185a2770883bdf574045490cab55))
* **urql:** use network only request policy ([bf7e3de](https://github.com/maevsi/maevsi/commit/bf7e3ded993a896607ab08ddfd68c48a71e50b59))
* **vuelidate:** migrate to v2 ([123bf46](https://github.com/maevsi/maevsi/commit/123bf46833ef9e530e2ace73a27f1edde4bfef2f))


### Reverts

* Revert "Merge branch 'feat/apollo-upgrade' into feat/vue-3" ([6903451](https://github.com/maevsi/maevsi/commit/6903451f67e5f4a9ff5de47f427146f4a46cea4a))

# [1.0.0-alpha.0](https://github.com/maevsi/maevsi/compare/0.146.6...1.0.0-alpha.0) (2022-10-17)


### Bug Fixes

* :bug: fix menu being empty in between tablet and phone breakpoint ([c6b4cb8](https://github.com/maevsi/maevsi/commit/c6b4cb8cfa273292bb3aa6db0e9534b256f27af8))
* **🫖:** workaround file name issue ([16b7a87](https://github.com/maevsi/maevsi/commit/16b7a879bec81f77c020a87375ee8b57e70749e3))
* **api-data:** correct refs ([9a3d1b3](https://github.com/maevsi/maevsi/commit/9a3d1b326d58b3d194e147e0280af9088751aed5))
* **apollo:** add provider to app ([ac38f78](https://github.com/maevsi/maevsi/commit/ac38f7828e8d4cb2c198f6f270fafe251391305f))
* **attendance:** temporarily disable async component ([c5cddc6](https://github.com/maevsi/maevsi/commit/c5cddc63df7e7bc057097c601a29b5d11cd8eaaf))
* **auth:** correct ssr ([ea51469](https://github.com/maevsi/maevsi/commit/ea514691379724d2c231ea04550f88c9d6c34851))
* **auth:** correct urql ref value ([91a4bd6](https://github.com/maevsi/maevsi/commit/91a4bd6c553ca4d0d5b16c9a0e4b7b39509a8979))
* **auth:** remove leftover debugger statement ([1c4df85](https://github.com/maevsi/maevsi/commit/1c4df8501ace4c41a977df911ac3919cdaf64bb8))
* **build:** pin htmlparser2 ([42e7300](https://github.com/maevsi/maevsi/commit/42e73009b2287f81f3499720d084697031ef8567))
* **button-icon:** remove duplicate class ([3406345](https://github.com/maevsi/maevsi/commit/3406345c95631024b64fafa079760fe469ecee41))
* **button:** correct type typing ([202176c](https://github.com/maevsi/maevsi/commit/202176cc32296ca672ccdbb814c2bb82f75de54a))
* **chartjs:** workaround import issue ([d1fac59](https://github.com/maevsi/maevsi/commit/d1fac59774d785f1a00362a906d4151afb3dd30f))
* **components:** correct imports ([50254e1](https://github.com/maevsi/maevsi/commit/50254e13f37a445f0dea3816e24bda7b95dfe0b0))
* **components:** correct svg import path ([74f39af](https://github.com/maevsi/maevsi/commit/74f39af93c8401fdef9ccdd9e7fc891d40b6d9fd))
* **components:** correct svg import path ([ed84e7c](https://github.com/maevsi/maevsi/commit/ed84e7cc9bd94326fbac839d58d77d815ffde4e4))
* **components:** correct svg imports ([d61c4e8](https://github.com/maevsi/maevsi/commit/d61c4e8f274dc6d18b2171cec7ba70cdf5ea8ed4))
* **composables:** extract host getter ([7c3b402](https://github.com/maevsi/maevsi/commit/7c3b4029a5c99ae372069231f1615043b620f82f))
* **config:** correct storybook typing ([32a79be](https://github.com/maevsi/maevsi/commit/32a79be52f33a206f934161be95e49eeeefa862c))
* **constants:** extract from config ([dc1c093](https://github.com/maevsi/maevsi/commit/dc1c0936723f1ee955cf65452609b2c0ec2839d9))
* correct cjs imports ([44f5291](https://github.com/maevsi/maevsi/commit/44f5291a2dd997e4f17d4fec23fbc890d2ab84fb))
* correct imports ([7ac3815](https://github.com/maevsi/maevsi/commit/7ac38159932880d0fc25033266b80c4640db420d))
* correct types ([5a1b44b](https://github.com/maevsi/maevsi/commit/5a1b44ba8e9f120a80f2b662e08de655777dd0c7))
* correct typing ([f199316](https://github.com/maevsi/maevsi/commit/f199316c2a7ccd7c5f6d41e7e2d7667f9759bf5d))
* **croppa:** use vue 3 installation ([5d6e3d5](https://github.com/maevsi/maevsi/commit/5d6e3d5088bf38d3c26799af4a8ece13119be1e7))
* **csp:** allow development websocket ([6d1fefd](https://github.com/maevsi/maevsi/commit/6d1fefdb3b0785d28369a29fb23077f59ea0b67e))
* **deps:** downgrade vue-tsc ([f5dc77c](https://github.com/maevsi/maevsi/commit/f5dc77c172d39e0ba5aeff5814b4c9d7bae2fefe))
* **deps:** upgrade @nuxtjs/robots to v3 ([44ffe30](https://github.com/maevsi/maevsi/commit/44ffe3089496a2f2301df918d3b1e277ca229dee))
* **docker:** add mkcert to development stage ([640af9e](https://github.com/maevsi/maevsi/commit/640af9e4bc0ce213911997f6f80abad7b78d9bf2))
* **docker:** copy cypress binary ([8096072](https://github.com/maevsi/maevsi/commit/8096072be13f7fc05ec3e7cfb39746f0b0d816b4))
* **docker:** increase timeout ([1ec78d9](https://github.com/maevsi/maevsi/commit/1ec78d98cbfae93889dc65b0bd5e332ea05325d2))
* **docker:** move development certificate generation to nuxt ([8d1b43f](https://github.com/maevsi/maevsi/commit/8d1b43f0eec7913b876b2d55353c9e4c39a0e9fe))
* **docker:** set host ([6190749](https://github.com/maevsi/maevsi/commit/61907496be49d83d64fa5e01e447a696d403fa42))
* **docker:** temporarily disable storybook ([2f7115f](https://github.com/maevsi/maevsi/commit/2f7115fc53ba3fc0c1cbf2cdf23bdfc1b88ba975))
* **drop-down:** use Vue 3's `nextTick` ([88cded5](https://github.com/maevsi/maevsi/commit/88cded556945b0d3b9ab7c451262a66772e37cb5))
* **event-list:** correct classes ([32813ec](https://github.com/maevsi/maevsi/commit/32813ec00863beb118c8cff9140e2c933134aa68))
* **events:** use methods for event handling ([e06ca82](https://github.com/maevsi/maevsi/commit/e06ca828b639990835b6bbba544821b6f6fc468c))
* **footer:** correct language selection ([47bf826](https://github.com/maevsi/maevsi/commit/47bf826908bac1809feed028653840b52afb3eaa))
* **footer:** use button instead of link ([a3a559a](https://github.com/maevsi/maevsi/commit/a3a559a419164efd07fb3ba8cb4c620f91833d34))
* **form-input:** correct validity check ([30ab99a](https://github.com/maevsi/maevsi/commit/30ab99a02c928f401d46f56c1f06a06b1131bc70))
* **form:** correct validation typing ([aaedfc6](https://github.com/maevsi/maevsi/commit/aaedfc60cbb8804ceafd2f8e75f85e1266eb0c5b))
* **form:** migrate sign-in to script setup ([bedd0f3](https://github.com/maevsi/maevsi/commit/bedd0f3e0d0140fa34c54103370a829bbebd5cdb))
* **graphql:** correct postgres error code typing ([8004ad4](https://github.com/maevsi/maevsi/commit/8004ad42c8bfcf36a129b1a19c158b14b09ceec0))
* **head:** correct imports ([181b0f9](https://github.com/maevsi/maevsi/commit/181b0f94f87fe70f7e3bd20c0b8ae3f088a08c11))
* **header:** allow connect-src self ([1650e01](https://github.com/maevsi/maevsi/commit/1650e019f803bf310fe8e8961722c6498c849906))
* **headers:** add connect-src csp for http ([f61f321](https://github.com/maevsi/maevsi/commit/f61f32141146da7b9776af470824b067872e269c))
* **headers:** temporarily disable trusted types ([d62ac8c](https://github.com/maevsi/maevsi/commit/d62ac8ce0459466e5b6ff093f3f743411c686278))
* **i18n:** add missing vite plugin ([59643e2](https://github.com/maevsi/maevsi/commit/59643e2f813b851f3506790e5f1033accd97e691))
* **i18n:** correct moment usage ([8b05be2](https://github.com/maevsi/maevsi/commit/8b05be2971dabf5394c7eb7d3369d9dca188462c))
* **i18n:** escape [@s](https://github.com/s) ([172e000](https://github.com/maevsi/maevsi/commit/172e000c5e8e2ed7f0f340c3a679668766234096))
* **i18n:** exclude node_modules ([29cac6c](https://github.com/maevsi/maevsi/commit/29cac6c686f3bb13db384c82809e9a26852962e0))
* **i18n:** migrate ([e499af5](https://github.com/maevsi/maevsi/commit/e499af5d42fbf74022cef8a20a08de92bcb9ef67))
* **icon:** declare property variables in plain script block ([9d925ff](https://github.com/maevsi/maevsi/commit/9d925ff0c523127dde79c58a20fa6b9605d7cbe0))
* **icon:** set default title in html ([3aa09a4](https://github.com/maevsi/maevsi/commit/3aa09a43589efc1bf0f4e0710618b3717ab3ac11))
* **icons:** readd title prop ([414471c](https://github.com/maevsi/maevsi/commit/414471c5433aaa8e6ae15e54f3f467f0c6a11d47))
* **image-upload-gallery:** use url for import ([87d4e60](https://github.com/maevsi/maevsi/commit/87d4e60c3a6a64648339ace1554c95290944802d))
* **invitation:** remove unused $pinia usage ([63f0a10](https://github.com/maevsi/maevsi/commit/63f0a10c7f85d1c7251c2c67c160f613738355db))
* **layout:** correct head ([8534e78](https://github.com/maevsi/maevsi/commit/8534e782747a21a5e26038d7f6686877474ee04a))
* **layout:** use head as composable ([fcdfa5a](https://github.com/maevsi/maevsi/commit/fcdfa5aa38616f641873a167ff2c77fcbea0f1ad))
* **loader-image:** migrate to script setup ([21935d0](https://github.com/maevsi/maevsi/commit/21935d0bb704d96e00110e8e77ab2ce9f37540a5))
* **loader:** initialize with empty array ([ea75ea9](https://github.com/maevsi/maevsi/commit/ea75ea906e9c1cc0f99f6a60853bb9728cf513a6))
* **moment:** workaround yet incompatible module ([fb1b7a7](https://github.com/maevsi/maevsi/commit/fb1b7a7135ea005d2ffe4126541dfb7a38e837f4))
* **nuxt:** correct base url ([f2a4b12](https://github.com/maevsi/maevsi/commit/f2a4b12f03698bbeef3bbb30377a67197b87a84a))
* **nuxt:** remove global event bus ([ac4c7a0](https://github.com/maevsi/maevsi/commit/ac4c7a038c7e2f314073a8f25ae5234177b4f9e1))
* **nuxt:** switch to edge to be able to use dev ([b088775](https://github.com/maevsi/maevsi/commit/b0887754fd3495f148d545c2e544420c1c63885c))
* **nuxt:** use host 0.0.0.0 ([9fc53b9](https://github.com/maevsi/maevsi/commit/9fc53b91e2f093d42a82919337839cc4f3b6e200))
* **package:** add missing import ([647edba](https://github.com/maevsi/maevsi/commit/647edbae8d1cdfbf3e820512660ffdca2ccd719d))
* **pages:** use auto imports ([4a15ea7](https://github.com/maevsi/maevsi/commit/4a15ea7989eee0bda6277e3cad4f513cf30a9bfd))
* **pages:** workaround locale-path issue ([259873e](https://github.com/maevsi/maevsi/commit/259873e5966d86e61b0466f7245f7c5f68bab0b9))
* **plugins:** remove nuxt 2 context ([1f6a133](https://github.com/maevsi/maevsi/commit/1f6a133482528df294b0c47d1fa1f3ba18bc75fd))
* **pnpm:** hoist shamefully ([e04aaed](https://github.com/maevsi/maevsi/commit/e04aaedbab3f9253f8d875bdfd119cd440ad4d2a))
* **pnpm:** temporarily allow lax peer dependencies ([6470d6e](https://github.com/maevsi/maevsi/commit/6470d6e6817706e7f0b371778f68d96ad7372d86))
* **qrcode-stream:** use async component ([583da2f](https://github.com/maevsi/maevsi/commit/583da2f90db66ece5390e0f83333a0c7eca919a0))
* **robots:** add hardcoded file as a workaround ([f31ca22](https://github.com/maevsi/maevsi/commit/f31ca228b7ba485b7bc55c9dcdda2da80205c42e))
* **robots:** hide warning ([9798944](https://github.com/maevsi/maevsi/commit/9798944b75d0b396dc7a1655e12928b9a56a9b3a))
* **script:** add missing languages ([d2abccc](https://github.com/maevsi/maevsi/commit/d2abcccf4ed8f2d552f7ab55a620433098487aa1))
* **sitemap:** hardcode ([b6ed030](https://github.com/maevsi/maevsi/commit/b6ed030d793a8561af6f44f27991ebb7fb3e9af4))
* **sqitch:** remove stashed test data ([4420f7a](https://github.com/maevsi/maevsi/commit/4420f7a33f7554a4bbdff3fadbc02c861a1e626e))
* **storybook:** disable temporarily ([309f264](https://github.com/maevsi/maevsi/commit/309f264dbe994ffa2d9be7d4b2b807a3ae96674c))
* **tailwind:** exclude nuxt config ([1bc6532](https://github.com/maevsi/maevsi/commit/1bc6532846c0fdbc62cf4fd63f70bd94e49f7c74))
* **ts:** use named imports ([98ace81](https://github.com/maevsi/maevsi/commit/98ace81fafba744ba1181a9db8c596f5f8d4e69b))
* **types:** add missing types ([9f63ec2](https://github.com/maevsi/maevsi/commit/9f63ec2c5558112618e726daad26349fa4426f27))
* **urql:** temporarily disable ssr ([0fe17ae](https://github.com/maevsi/maevsi/commit/0fe17aed6c6abbeeee7e469d6a435250449f8f60))
* **urql:** temporarily disable urql type checking ([6ef8c89](https://github.com/maevsi/maevsi/commit/6ef8c89bc0440a28d30a87e7ec93726fc975cecf))
* **vite:** add gql rollup plugin ([df2d881](https://github.com/maevsi/maevsi/commit/df2d881eb6d934e40892248bc80d68600aee4c00))
* **vue-qrcode-reader:** switch to fork ([47e097d](https://github.com/maevsi/maevsi/commit/47e097db55a0a9881deac2cf311912cecfb9b21c))
* **vuelidate:** correct validation ([c23c14c](https://github.com/maevsi/maevsi/commit/c23c14cc7d71fcfb1cf4b57cc17a7dbb9470087d))


### Features

* :sparkles: add title prop to icons ([c4b9691](https://github.com/maevsi/maevsi/commit/c4b969190c7e7c6e3ff68be953721dd0b124256f))
* add cypress ([f8d5cf6](https://github.com/maevsi/maevsi/commit/f8d5cf6a7649c91e46bd264b5a3d890058575647))
* **apollo:** complete own plugin ([492a23f](https://github.com/maevsi/maevsi/commit/492a23f90ba71612558b565ef9cc0651ddd395ff))
* **apollo:** remove ([135b835](https://github.com/maevsi/maevsi/commit/135b835eaa54adae43a608360e2067b9cf079dd1))
* **apollo:** upgrade ([efca0e2](https://github.com/maevsi/maevsi/commit/efca0e26824adc94233f86f49aa7ad19e2b6c3c8))
* **apollo:** use own module ([2ba7af5](https://github.com/maevsi/maevsi/commit/2ba7af5cddb6bfa3ebbf39e38b7dc0722e055e5d))
* **apollo:** use ssr ([5935190](https://github.com/maevsi/maevsi/commit/5935190bd5f8402a9f8984a879b896dfe99b425a))
* **button:** compute classes ([f326237](https://github.com/maevsi/maevsi/commit/f326237a89a0ceb9739dd7f982f6d762b28db5a2))
* **components:** migrate this usage to setup function ([a19e276](https://github.com/maevsi/maevsi/commit/a19e276735172a42472087dd75fa82963852af67))
* **components:** replace require with import ([a1eea20](https://github.com/maevsi/maevsi/commit/a1eea20c65d8c28462869b5b4306ea099628e5fb))
* **components:** use default ids for common form inputs ([a569c7a](https://github.com/maevsi/maevsi/commit/a569c7aaa2c388107adf7832c6fc898b8785d81c))
* **config:** rename development indicator ([8151fe0](https://github.com/maevsi/maevsi/commit/8151fe03dee5bea42a003138a7f49b2400cdfdd9))
* **config:** rename storybook indicator ([c41ed29](https://github.com/maevsi/maevsi/commit/c41ed2922d95b4b0b08eb7024f5b05fb9ca27435))
* **cookie:** temporarily disable cookie control ([2a44430](https://github.com/maevsi/maevsi/commit/2a444306e4e659ba82fe3f342eaa9df599cca5d9))
* deprecate stack domain and base url ([a570a87](https://github.com/maevsi/maevsi/commit/a570a87d4c6703f183d0b399af66d8c2becb9f64))
* **event-group:** remove temporarily ([626e031](https://github.com/maevsi/maevsi/commit/626e031451c19840605a88c3109591933d5475d0))
* **event-list:** migrate to urql ([45e74ac](https://github.com/maevsi/maevsi/commit/45e74ac32dd61398c210ef7505e9bf8d1c06c608))
* **form-delete:** migrate to urql ([ced1df6](https://github.com/maevsi/maevsi/commit/ced1df616c8bd634473fea8a1ef03e1df1d3cb72))
* **form-delete:** unwrap app ([c4055a4](https://github.com/maevsi/maevsi/commit/c4055a4d8753d6f7292e1ef264ea5281ffdf5dc9))
* **gql:** use after-pagination ([30e892e](https://github.com/maevsi/maevsi/commit/30e892e7d7d955a1120d0c714322203ed4e1e909))
* **graphql:** add devtools ([6b208c7](https://github.com/maevsi/maevsi/commit/6b208c7f030d3052906e1faf594944901358497a))
* **head:** add composables ([8d4d5e1](https://github.com/maevsi/maevsi/commit/8d4d5e1e4f7fd7cb0fe95350c80ffbfba6f68946))
* **headers:** disable deprecated expect-ct ([1b1e692](https://github.com/maevsi/maevsi/commit/1b1e692708b28e0f9ef8e7147154181df9a37675))
* **head:** migrate to new specification ([8f6eedd](https://github.com/maevsi/maevsi/commit/8f6eedd191ce08a950d92cac1f94c0cebd6d5cb6))
* **i18n:** migrate to new component syntax ([fe65ebb](https://github.com/maevsi/maevsi/commit/fe65ebb36fa6b88f3dce97f585ba68497bf60605))
* **i18n:** migrate to translation function ([a2c81d4](https://github.com/maevsi/maevsi/commit/a2c81d430e10ef74b321909561636dc332bd9259))
* **image-upload-gallery:** migrate ([6eb62fc](https://github.com/maevsi/maevsi/commit/6eb62fc2fc35e7b6c317a0fb9c479d741722d91b))
* implement feedback on english translations ([4e2061a](https://github.com/maevsi/maevsi/commit/4e2061a2e6b6188ff4861a316f811ed6bdd2c96a))
* improve english translations ([0df0b26](https://github.com/maevsi/maevsi/commit/0df0b2643fcaf0e2315c0b5d0810bdead8efc1d3))
* **index:** revert one i18n change ([21a73df](https://github.com/maevsi/maevsi/commit/21a73df751c6afe3513352d647b37917a4cfce0a))
* **jwt:** migrate to jose ([0f1876f](https://github.com/maevsi/maevsi/commit/0f1876fba788797d574ecd2cda71b40ad11c5e2e))
* migrate to new slot syntax ([9cf6204](https://github.com/maevsi/maevsi/commit/9cf6204b19c53b7b5d9ba49320cbd981f591203e))
* **nitro:** enable compression for public assets ([5fd52fa](https://github.com/maevsi/maevsi/commit/5fd52fabbc34c534296c95846f07735133c81639))
* **nuxt-i18n:** add vue-i18n-composable ([4ef2139](https://github.com/maevsi/maevsi/commit/4ef21393589da701f15e22d8289da923c1ea07c1))
* **nuxt:** add html validator module ([d57874f](https://github.com/maevsi/maevsi/commit/d57874fb799723709ab1a2f0fd542cc587fa1baa))
* **nuxt:** disable aliases ([70e153f](https://github.com/maevsi/maevsi/commit/70e153fce547aa901f5c2f8568291b3644649357))
* **nuxt:** enable https ([4007a4a](https://github.com/maevsi/maevsi/commit/4007a4a2e7528415babe99eef8dfd23c391d71ed))
* **package:** migrate to module ([39ed308](https://github.com/maevsi/maevsi/commit/39ed3087a2c317e9321e7649d212d55881195299))
* **package:** set version to alpha.0 ([87b7306](https://github.com/maevsi/maevsi/commit/87b73066e72232f1300c89e47e10d0b2316f62f6))
* **pages:** use generated queries ([67d4b80](https://github.com/maevsi/maevsi/commit/67d4b800664d2014f6d9eb796eca67017be14a0a))
* remove storybook ([f34b4fb](https://github.com/maevsi/maevsi/commit/f34b4fbdf0da4230e649b46586bfe32acd54ee45))
* remove unnecessary imports ([0a5886a](https://github.com/maevsi/maevsi/commit/0a5886a8917819e676272b4799c2c657904349bc))
* replace apollo with urql usage, generate code ([790dc82](https://github.com/maevsi/maevsi/commit/790dc82658f43f8f3db1e140eeb1fdd8242e609a))
* stash ([52b2fbe](https://github.com/maevsi/maevsi/commit/52b2fbed621f8aef337dcfbd50c60451083fe33a))
* **store:** replace vuex with pinia ([a005459](https://github.com/maevsi/maevsi/commit/a005459ba991242f39c7b385b6f1b5ba16c406ec))
* **tusd:** add composable ([32db139](https://github.com/maevsi/maevsi/commit/32db1393d2c118d8734b82c3b67044b9e74d7a17))
* **urql:** enable ssr hooks ([0021733](https://github.com/maevsi/maevsi/commit/0021733666a9185a2770883bdf574045490cab55))
* **urql:** use network only request policy ([bf7e3de](https://github.com/maevsi/maevsi/commit/bf7e3ded993a896607ab08ddfd68c48a71e50b59))
* **vuelidate:** migrate to v2 ([123bf46](https://github.com/maevsi/maevsi/commit/123bf46833ef9e530e2ace73a27f1edde4bfef2f))


### Reverts

* Revert "Merge branch 'feat/apollo-upgrade' into feat/vue-3" ([6903451](https://github.com/maevsi/maevsi/commit/6903451f67e5f4a9ff5de47f427146f4a46cea4a))

## [0.146.6](https://github.com/maevsi/maevsi/compare/0.146.5...0.146.6) (2022-10-17)


### Bug Fixes

* **image-upload-gallery:** use url for import ([8397fc6](https://github.com/maevsi/maevsi/commit/8397fc697d86f0585a0b536727c43e51dcc3667a))

## [0.146.5](https://github.com/maevsi/maevsi/compare/0.146.4...0.146.5) (2022-10-17)


### Bug Fixes

* **release:** schedule release ([9071d38](https://github.com/maevsi/maevsi/commit/9071d38467fa97eb23d7f023b321f5f163b47deb))

## [0.146.4](https://github.com/maevsi/maevsi/compare/0.146.3...0.146.4) (2022-10-10)


### Bug Fixes

* **release:** schedule release ([8b38d35](https://github.com/maevsi/maevsi/commit/8b38d35e27de20004524bdf3be5d586cc43b3ae5))

## [0.146.3](https://github.com/maevsi/maevsi/compare/0.146.2...0.146.3) (2022-10-03)


### Bug Fixes

* **release:** schedule release ([c6af218](https://github.com/maevsi/maevsi/commit/c6af2187e6022c23098ff440762ba1328e2358c2))

## [0.146.2](https://github.com/maevsi/maevsi/compare/0.146.1...0.146.2) (2022-09-19)


### Bug Fixes

* **release:** schedule release ([8c56d98](https://github.com/maevsi/maevsi/commit/8c56d9883a165b6d5519058d9bfbed4d5d7ca69b))

## [0.146.1](https://github.com/maevsi/maevsi/compare/0.146.0...0.146.1) (2022-09-10)


### Bug Fixes

* **docker:** temporarily disable healthcheck ([2037c4b](https://github.com/maevsi/maevsi/commit/2037c4b6eb67912c589ad707b451e3c9f4dc85b0))

# [0.146.0](https://github.com/maevsi/maevsi/compare/0.145.6...0.146.0) (2022-09-09)


### Features

* **sqitch:** mount run for socket ([bf36b12](https://github.com/maevsi/maevsi/commit/bf36b122e057ed5dd780971316335e5af734dac0))
* **sqitch:** remove target environment variable template ([3661ad9](https://github.com/maevsi/maevsi/commit/3661ad988e08247ef842d108667cbe14fd4d63f4))

## [0.145.6](https://github.com/maevsi/maevsi/compare/0.145.5...0.145.6) (2022-08-31)


### Bug Fixes

* **csp:** temporarily disable trusted-types header ([f317b69](https://github.com/maevsi/maevsi/commit/f317b6935c984d964970eeb6e10be9b09789ac26)), closes [#825](https://github.com/maevsi/maevsi/issues/825)

## [0.145.5](https://github.com/maevsi/maevsi/compare/0.145.4...0.145.5) (2022-08-22)


### Bug Fixes

* **header:** add missing require-trusted-types-for header ([5ea3de1](https://github.com/maevsi/maevsi/commit/5ea3de17c508f79d1ab5900a98ff87137f09c1f5))
* **header:** correct quotes ([44f48d0](https://github.com/maevsi/maevsi/commit/44f48d0bf693cd67283cdd5bfd1c4296c6a76714))

## [0.145.4](https://github.com/maevsi/maevsi/compare/0.145.3...0.145.4) (2022-08-22)


### Bug Fixes

* **release:** schedule release ([c63e317](https://github.com/maevsi/maevsi/commit/c63e317050d14fdde08b89748e61304bbeeb2105))

## [0.145.3](https://github.com/maevsi/maevsi/compare/0.145.2...0.145.3) (2022-08-15)


### Bug Fixes

* **headers:** specify self hostname ([95286b8](https://github.com/maevsi/maevsi/commit/95286b89b8d6edf2431eee10bb6e29ac74edfec2))

## [0.145.2](https://github.com/maevsi/maevsi/compare/0.145.1...0.145.2) (2022-08-14)


### Bug Fixes

* **headers:** allow postgraphile and tusd ([2d445ac](https://github.com/maevsi/maevsi/commit/2d445ac15f83883d469d7b3d38abbb0c97445afe))

## [0.145.1](https://github.com/maevsi/maevsi/compare/0.145.0...0.145.1) (2022-08-14)


### Bug Fixes

* **headers:** allow self and cloudflare connect sources ([ebaa220](https://github.com/maevsi/maevsi/commit/ebaa2201914e5a40c2c351fd6f7eb9ee7bdba810))

# [0.145.0](https://github.com/maevsi/maevsi/compare/0.144.1...0.145.0) (2022-08-14)


### Bug Fixes

* **event:** redirect to dashboard after deletion ([ef991ce](https://github.com/maevsi/maevsi/commit/ef991cedad6bbad25043d5ae1a1bfc64f5cc4c8c))
* **event:** revert event deletion changes ([1f162ff](https://github.com/maevsi/maevsi/commit/1f162ffc6e14ac72435fc6d8c213dc8dfd8b5be5))
* **form:** reenable submit button ([f616a06](https://github.com/maevsi/maevsi/commit/f616a0683f32a70cd35022554a58be55f523bd4e))
* **invitation-list:** rename feedback to response ([56417d6](https://github.com/maevsi/maevsi/commit/56417d6bcff000c76df1b70aae71d57847e45694))
* **invitation:** improve spacing ([398e800](https://github.com/maevsi/maevsi/commit/398e80059400d86b719825f8d755c2ef16fd8860))
* **tiptap:** add minimum height ([7cbf4d5](https://github.com/maevsi/maevsi/commit/7cbf4d540acfcac6c5b0a795a82a61fbed2198f1))
* **tiptap:** correct hr button ([592d7be](https://github.com/maevsi/maevsi/commit/592d7be2a786b269b63931d94acd70fd9b712a52))
* **tiptap:** correct number translations ([de38891](https://github.com/maevsi/maevsi/commit/de3889197be7062678cdf57dcf68cf05e75e8126))
* **util:** add network error to graphql error list ([d3eac2e](https://github.com/maevsi/maevsi/commit/d3eac2ec934150948918dea7976338951862ed96))


### Features

* **invitation-list:** add hint about inviting the organizer ([6f0f22a](https://github.com/maevsi/maevsi/commit/6f0f22ac4f0b3464a0df31e2f8b6c59486a5a871))
* **sign-in:** replace page reload with navigation ([462f5fe](https://github.com/maevsi/maevsi/commit/462f5fef5cb926c4ae03e6746c0c0588c22c1874)), closes [#752](https://github.com/maevsi/maevsi/issues/752)
* temporarily disable enter submit on form and modal ([3e20d76](https://github.com/maevsi/maevsi/commit/3e20d763606d0be2f745123fa517c123b8765cc1)), closes [#765](https://github.com/maevsi/maevsi/issues/765)

## [0.144.1](https://github.com/maevsi/maevsi/compare/0.144.0...0.144.1) (2022-08-14)


### Bug Fixes

* **account:** improve deletion error message ([2f8e2ec](https://github.com/maevsi/maevsi/commit/2f8e2ec1243cd8dd1e5d1669883e94225f576f74))
* correct spacing ([5b53e2a](https://github.com/maevsi/maevsi/commit/5b53e2a94e2bc5eed01ca05e48442f7528beb343))
* **even:** fix deletion ([e551674](https://github.com/maevsi/maevsi/commit/e5516746c0c2ab6c0f7686fab0a98a79c07d6a0c))
* **event:** replace key eye-off icon for private events ([7f7a248](https://github.com/maevsi/maevsi/commit/7f7a2481609c4251caf782faa091e5da355c17c6))
* **image-upload-gallery:** correct border color ([221f0d0](https://github.com/maevsi/maevsi/commit/221f0d04d4345d35bbc2a04d03a5ccf51dc25150))
* **index:** fix spacing, increase opacity ([2cabcf1](https://github.com/maevsi/maevsi/commit/2cabcf1af04a45439fac2fe454e77a71bec673a1))
* **invitation-list:** correct invitation link ([d6a9e4a](https://github.com/maevsi/maevsi/commit/d6a9e4afe14a7470e0add5bb1cfa39a423df3a38))
* **invitation:** improve check in code ui ([4376883](https://github.com/maevsi/maevsi/commit/4376883f5c6a9684b6b7caaf6a6ad6a6a2ce6996))
* **modal-image-selection:** default to direct image addition ([149ebf9](https://github.com/maevsi/maevsi/commit/149ebf90a54bb8133a99409c72f9ddbc4d3609b4))

# [0.144.0](https://github.com/maevsi/maevsi/compare/0.143.0...0.144.0) (2022-08-13)


### Bug Fixes

* **card-state:** correct background color ([595bf23](https://github.com/maevsi/maevsi/commit/595bf239f085a19e40ed6031c9ca6228ef0f87e4))
* **contact-preview:** correct feedback icon background color ([751a371](https://github.com/maevsi/maevsi/commit/751a37194d5fd65b715cfea53e88c87d07b4f457))
* **event-dashlet-start:** correct line height ([c48f0fe](https://github.com/maevsi/maevsi/commit/c48f0fefab705d273eb92790964116bb3b14e7de))
* **event-list:** readd gap ([a96fd2c](https://github.com/maevsi/maevsi/commit/a96fd2c37d168d7d4b9e82dc946dde4dcde162e5))
* **invitation:** correct button width ([4727860](https://github.com/maevsi/maevsi/commit/472786083b7ce5f2af1ba9bf9fe1a56700a52811))


### Features

* **app-link:** replace underline with color ([b350916](https://github.com/maevsi/maevsi/commit/b350916a5a67a79f7b707cbb23e465cff9c2fabd))
* **backdrop-blur:** improve fade ([52d89f1](https://github.com/maevsi/maevsi/commit/52d89f13e628127e97ac0830315a24b33dd710cb))
* **button:** remove button-table ([76f75dd](https://github.com/maevsi/maevsi/commit/76f75dd7cba79fdb05b4d2c3fd22ff849b3c48a7))
* **card:** replace border with background color ([1bc66cb](https://github.com/maevsi/maevsi/commit/1bc66cb71918856095d3cfe146854cbae7e06df7))
* **event:** tweak ui ([2d1b65c](https://github.com/maevsi/maevsi/commit/2d1b65cb88a83bafd806a09b7ccf1af885f60dc5))
* **header:** change breakpoint ([9b83793](https://github.com/maevsi/maevsi/commit/9b83793437fbfdf0728361c24b7a3f73073cd263))
* **index:** add scroll hint ([dd7eaa5](https://github.com/maevsi/maevsi/commit/dd7eaa5b1b8e9102f6841d32324bba1f674c4623))
* **index:** tweak ui ([78de8af](https://github.com/maevsi/maevsi/commit/78de8af95152877d9869f7ac2cff5849d5bee8c8))
* **invitation-list:** tweak table colors ([dd8a452](https://github.com/maevsi/maevsi/commit/dd8a452be14eae162a9143a473ee99c453387084))
* **invitation:** slight feedback redesign ([e7ee188](https://github.com/maevsi/maevsi/commit/e7ee1888286455e594f2a3b8a9cb8c6a616c9795))
* **tailwind:** improve background color naming ([06184c9](https://github.com/maevsi/maevsi/commit/06184c938cd27c783a0b7ec0e948778445ef8029))
* **tailwind:** remove selection color ([3fdf238](https://github.com/maevsi/maevsi/commit/3fdf2387190ebd729e101741cbc487632e9c030a))
* **tailwind:** replace backdrop darken with blur ([a0d81bd](https://github.com/maevsi/maevsi/commit/a0d81bd8b117b1618942f410431c7c9a32bed11e))
* **tailwind:** tweak colors ([a5fe01a](https://github.com/maevsi/maevsi/commit/a5fe01a216072ee2058f06abfff6d7423eec5c40))

# [0.143.0](https://github.com/maevsi/maevsi/compare/0.142.0...0.143.0) (2022-08-12)


### Bug Fixes

* **i18n:** improve wordin ([2576f31](https://github.com/maevsi/maevsi/commit/2576f316edfb718ebd713106fb7e4013273f04ab))
* **index:** improve i18n ([fff0d9d](https://github.com/maevsi/maevsi/commit/fff0d9d94256acb3b7a16d1a74b696b1a6ea1b5c))
* tweak line colors ([d48fea1](https://github.com/maevsi/maevsi/commit/d48fea16211397bd96b7083fca366b4873849a6b))


### Features

* **css:** add container-extended ([82372c1](https://github.com/maevsi/maevsi/commit/82372c12fb10b278740d56c923ea557d670ddd5e))
* **event-list:** replace legend with tags ([c3964b2](https://github.com/maevsi/maevsi/commit/c3964b288b9a888d74a3765cbab21763688e13b4))
* **header:** add sign-in button ([145aa59](https://github.com/maevsi/maevsi/commit/145aa598060563b1e0dfb1aef9c3e16bd51e9228))

# [0.142.0](https://github.com/maevsi/maevsi/compare/0.141.0...0.142.0) (2022-08-11)


### Bug Fixes

* **i18n:** implement feedback ([be68ddc](https://github.com/maevsi/maevsi/commit/be68ddcbf14592ce6d9c5f662552bbb6e6b7b8f9))
* **lint:** correct line break ([4b016c7](https://github.com/maevsi/maevsi/commit/4b016c787f991906321b8d03c721eff77ea976b9))
* **tiptap:** correct icons ([6218f8f](https://github.com/maevsi/maevsi/commit/6218f8fdc05b6ef3db0e2fbc73ec1e15871688b2))


### Features

* **form-event:** add warning for name change ([139e179](https://github.com/maevsi/maevsi/commit/139e1791bf2b434b856b8237399262387e0bdd58))
* **ui:** implement suggestions ([6250ae1](https://github.com/maevsi/maevsi/commit/6250ae14252b920b425170b881d5b3cab8d63fb7))

# [0.141.0](https://github.com/maevsi/maevsi/compare/0.140.1...0.141.0) (2022-08-10)


### Bug Fixes

* **event-dashlet:** move display conditional ([95600b8](https://github.com/maevsi/maevsi/commit/95600b871a0b22fb5d188ffa2843a5631419624d))
* **i18n:** improve texts ([61e3223](https://github.com/maevsi/maevsi/commit/61e3223f5f8840f12d8ebf3773b67b90b55ba518))


### Features

* **contact-preview:** add link to username ([e580e0c](https://github.com/maevsi/maevsi/commit/e580e0c0464aeafe14b8c94c0b08fca6cc1f9c62))
* **form-input-password:** show required password length ([6e83873](https://github.com/maevsi/maevsi/commit/6e838734ac52fda2b4e985de97759374acb88899))
* **invitation:** rename add invitation to add guest ([fe3ac40](https://github.com/maevsi/maevsi/commit/fe3ac40b050c58bcb7e9940e4e962b74d7726dba))
* **tiptap:** hide paragraph button ([6b2c204](https://github.com/maevsi/maevsi/commit/6b2c20431b9e28b5953cc65ade6d0127580df9b0))

## [0.140.1](https://github.com/maevsi/maevsi/compare/0.140.0...0.140.1) (2022-08-10)


### Bug Fixes

* **docker-entrypoint:** set pnpm store not in production ([b8be764](https://github.com/maevsi/maevsi/commit/b8be764162f8114637d28fe74a75db4e21b46c5a))
* **tailwind:** solve line-height overflow once and for all, hopefully ([8364c18](https://github.com/maevsi/maevsi/commit/8364c18cda6997312d2f7f5458c0e384396d9a26))

# [0.140.0](https://github.com/maevsi/maevsi/compare/0.139.0...0.140.0) (2022-08-10)


### Features

* **sqitch:** mark function events-invited as stable ([6b28a9c](https://github.com/maevsi/maevsi/commit/6b28a9c0ca870c66f87eaffad1456aadc9e59e92))

# [0.139.0](https://github.com/maevsi/maevsi/compare/0.138.2...0.139.0) (2022-08-06)


### Bug Fixes

* **event:** check for event definition ([f662ca0](https://github.com/maevsi/maevsi/commit/f662ca018136965eeb9177e8a827c94f80a94543))


### Features

* **card-state-alert:** set selection background color to purple ([3389964](https://github.com/maevsi/maevsi/commit/3389964d59b79cd4410f9aa3fedb5ac9ae721ef6))

## [0.138.2](https://github.com/maevsi/maevsi/compare/0.138.1...0.138.2) (2022-08-01)


### Bug Fixes

* **tiptap:** add client-only tags ([7fba994](https://github.com/maevsi/maevsi/commit/7fba9947370e700fc55bd496ba7ea93017c6fc9a))

## [0.138.1](https://github.com/maevsi/maevsi/compare/0.138.0...0.138.1) (2022-07-30)


### Bug Fixes

* **headers:** enable all ([fe8430e](https://github.com/maevsi/maevsi/commit/fe8430e9ffd0bba080468f82bbc9e3f4d78fee72))
* **html-validator:** fail on error ([e6bc0bb](https://github.com/maevsi/maevsi/commit/e6bc0bb3ade9e4c65302b37fa6ef8486319f445d))
* **nuxt:** disable css workaround for production ([bd9b42c](https://github.com/maevsi/maevsi/commit/bd9b42c66428ceda55bf7fc0f425f9acac70e9a6))
* **nuxt:** workaround webpack error ([e52f3a2](https://github.com/maevsi/maevsi/commit/e52f3a28784f1e461693f75479d7c1e77fd0db6e))
* readd csp headers ([81d008f](https://github.com/maevsi/maevsi/commit/81d008f970cc9ed300cecd0c531d1efcf00e0843))
* **server:** correct csp headers ([3afe0b3](https://github.com/maevsi/maevsi/commit/3afe0b31d05551cfa042d76d4cc4ea33ab88df35))


### Performance Improvements

* decrease clipboard dependency depth ([408a945](https://github.com/maevsi/maevsi/commit/408a945ce944887155dfa972465932ed815dc072))
* decrease sweetalert dependency depth ([e32b251](https://github.com/maevsi/maevsi/commit/e32b251cc8bd503b296e2245dd76e7cf7d7ead06))

# [0.138.0](https://github.com/maevsi/maevsi/compare/0.137.2...0.138.0) (2022-07-18)


### Bug Fixes

* **apollo:** add provider to app ([d363fa7](https://github.com/maevsi/maevsi/commit/d363fa7674c1d639db605304babb8593dcb23559))


### Features

* **apollo:** complete own plugin ([f53a204](https://github.com/maevsi/maevsi/commit/f53a204bff673535d2f637f29489c404d09ecd70))
* **apollo:** use own module ([0a3a708](https://github.com/maevsi/maevsi/commit/0a3a7081d85f8aa7f56325c67ba31b6ee5f41702))
* **apollo:** use ssr ([4dda1ee](https://github.com/maevsi/maevsi/commit/4dda1eeecb28903eaf75f1e606d2574e9498185a))

## [0.137.2](https://github.com/maevsi/maevsi/compare/0.137.1...0.137.2) (2022-07-16)


### Bug Fixes

* **pnpm:** install via npm ([f63fd3f](https://github.com/maevsi/maevsi/commit/f63fd3fbe77316abe99bc5108840c2d3573152a8))

## [0.137.1](https://github.com/maevsi/maevsi/compare/0.137.0...0.137.1) (2022-07-15)


### Bug Fixes

* **docker:** correct entrypoint ([903a582](https://github.com/maevsi/maevsi/commit/903a582f73ca86fad060a5257a1ed830340d4180))

# [0.137.0](https://github.com/maevsi/maevsi/compare/0.136.0...0.137.0) (2022-07-15)


### Features

* **docker:** use output only ([c41bde2](https://github.com/maevsi/maevsi/commit/c41bde2e95a59824d5dae5c7f0c9126d13760c68))

# [0.136.0](https://github.com/maevsi/maevsi/compare/0.135.1...0.136.0) (2022-07-15)


### Bug Fixes

* **button-colored:** improve secondary background colors ([3a01aed](https://github.com/maevsi/maevsi/commit/3a01aed1a2a1c551636c0b6580c78d2b7820fc81))
* **chart:** disable label click ([a65db41](https://github.com/maevsi/maevsi/commit/a65db41939293f3c7eed61867a4a3a8a40984551))
* **dev:** add missing store variable ([e9553e7](https://github.com/maevsi/maevsi/commit/e9553e75fea33fbac036a7a5d79638be7417db9a))
* **event:** show name instead of slug in breadcrumbs ([285c493](https://github.com/maevsi/maevsi/commit/285c49330ad76d656f4c7f4247399f14c18515be))
* **form-event:** i18n datetimes ([690b323](https://github.com/maevsi/maevsi/commit/690b3239d340db0a1d4dcc5a0eb9eb5d8c929ee9))
* **form-invitation:** search for lowercase usernames ([3b2f0b7](https://github.com/maevsi/maevsi/commit/3b2f0b7c732806105d12e57c8b309dd52912cecc))
* **icon-link:** use hero icon ([15f7b91](https://github.com/maevsi/maevsi/commit/15f7b9120dc307244187f7ffc354e05746179627))
* **invitation-list:** correct i18n ([804aae0](https://github.com/maevsi/maevsi/commit/804aae0faad6fd1129e8204e71af9c0fab2ad2dc))
* **menu:** correct background sizing ([4a874bc](https://github.com/maevsi/maevsi/commit/4a874bcca49d243e98a2ceb40638cd7d53b8754c))
* **pages:** correct middleware redirects ([c0a5263](https://github.com/maevsi/maevsi/commit/c0a5263ab105467501c39da33b64050f67985b98))
* **tip-tap:** correct class usage ([2989aef](https://github.com/maevsi/maevsi/commit/2989aef7135ff6e6e835a7d314d4b2354c22d04f))


### Features

* **account:** migrate to tasks ([57a5f14](https://github.com/maevsi/maevsi/commit/57a5f14c9eead924088b5523c252b024a456fbac))
* **contact:** improve address placeholder ([e651eeb](https://github.com/maevsi/maevsi/commit/e651eeba677295199bfe082024e3ccaf2d3dafc9))
* **dashboard:** add content ([abbf720](https://github.com/maevsi/maevsi/commit/abbf7207300487ae1f0ec96073d6cec2044d6f2e))
* **event:** move edit button to last ([23dfbaa](https://github.com/maevsi/maevsi/commit/23dfbaabf23398f3ff210876b571d9542be93bb9))
* **form-account-password-change:** remove confirmation ([e30f895](https://github.com/maevsi/maevsi/commit/e30f8958f91aded48c30dff7f1cc2ff60ef0d75b))
* **form-account:** improve i18n ([f107cce](https://github.com/maevsi/maevsi/commit/f107cce46ff9eb4d2395018279b37949865d4411))
* **form-account:** remove modal timers where unwanted ([ce35871](https://github.com/maevsi/maevsi/commit/ce3587129b18d2c7e85b1d86d9c71b45dded0932))
* **form-event:** improve modality ([fb751a6](https://github.com/maevsi/maevsi/commit/fb751a667ae242929a9f698009f856fa6f94be4a))
* **form-input-password:** make password viewable ([43c7ef7](https://github.com/maevsi/maevsi/commit/43c7ef7821bdc0fe652ceb6e80cff55f557ea761))
* **form-input:** improve labels ([29e7643](https://github.com/maevsi/maevsi/commit/29e7643c43c0ea429e8dd6a391f4f0e83ac2ec6e))
* **header:** add search bar ([0428750](https://github.com/maevsi/maevsi/commit/042875064487f777236347b40a9fe177065614e2))
* rework navigation ([08038bc](https://github.com/maevsi/maevsi/commit/08038bcff2e700d240f2545c70523ad03f97bab9))
* **search:** add task ([b32a39f](https://github.com/maevsi/maevsi/commit/b32a39f48794d2c2f693295f60b4e9ebe9b5f9ce))
* **twemoji:** use svg instead ([8162082](https://github.com/maevsi/maevsi/commit/816208219fd334ced490dc561ec834009e6459d6))
* **unlock:** remove interaction ([030c6ff](https://github.com/maevsi/maevsi/commit/030c6ffa40b88aefbb41637c119465ed1ca33d0d))
* **verify:** redirect to sign in on success ([9475f34](https://github.com/maevsi/maevsi/commit/9475f34fbd506541351f465c1658294a8b44862b))

## [0.135.1](https://github.com/maevsi/maevsi/compare/0.135.0...0.135.1) (2022-07-13)


### Bug Fixes

* **package:** downgrade isomorphic-dompurify to v0.15.0 ([069bdbe](https://github.com/maevsi/maevsi/commit/069bdbeb5b019dd395318251d21e143156dbeecc))

# [0.135.0](https://github.com/maevsi/maevsi/compare/0.134.2...0.135.0) (2022-07-13)


### Bug Fixes

* **contact-list-item:** correct contact username check ([1d7fa12](https://github.com/maevsi/maevsi/commit/1d7fa12e87b3d09392ddbc33490693321a632181))
* **form-input-state-warning:** correct icon ([2c6a7e8](https://github.com/maevsi/maevsi/commit/2c6a7e88a40dec35207cb588f6c0aaa9dacb11b3))
* **form-input:** prevent flex overflow ([686ae9d](https://github.com/maevsi/maevsi/commit/686ae9d5828ce3817d117e125e3a9c6082d87ba4))
* **icon-x-circle:** use filled variant ([81b2cec](https://github.com/maevsi/maevsi/commit/81b2cecd844d7ced87266fea88837aff1811ff86))
* **invitation-list:** correct feedback size ([5f3ea5c](https://github.com/maevsi/maevsi/commit/5f3ea5c02fd62f056cdcc3e6e538ba852c6a62ce))
* **invitation:** correct button order ([d92437c](https://github.com/maevsi/maevsi/commit/d92437c223ed5abe2b2ee299aa1368bfe709e130))
* minor spacing fixes ([f6d123f](https://github.com/maevsi/maevsi/commit/f6d123fa33a6098d3e80d3455de2ced4fa2ff240))
* **nuxt:** transpile headers-polyfill ([45c4640](https://github.com/maevsi/maevsi/commit/45c4640144eb813eabe41b1b54e348ac9f48988f))
* **storycap:** make test throw on error ([4d7c173](https://github.com/maevsi/maevsi/commit/4d7c173bca0315266af32ce5fad6861fa18aeac0))
* **tailwind:** overflow with ellipsis for all headings ([572b2db](https://github.com/maevsi/maevsi/commit/572b2db5dbaeb7b1804dd22bfcaa86b9fa2c0787))


### Features

* add breadcrumb navigation ([edc56f4](https://github.com/maevsi/maevsi/commit/edc56f4385f899c4f7dc9b9be44d47f54898fd49)), closes [#144](https://github.com/maevsi/maevsi/issues/144)
* **hr:** add component ([e48a269](https://github.com/maevsi/maevsi/commit/e48a269b643c6c56b18a5968bc77ee411d5f8a24))
* **index:** redirect to dashboard when logged in ([5505f6d](https://github.com/maevsi/maevsi/commit/5505f6d8d99bab1665150c3dae8cfd1f85fd84b1))
* **index:** redirect to event list instead of profile for signed in users ([fbff2fe](https://github.com/maevsi/maevsi/commit/fbff2feb2c4b67ecb2bb1009d2a3ed5244b2adc7))
* **steps:** add proof of concept ([b60ca94](https://github.com/maevsi/maevsi/commit/b60ca940e292d054544e17d2f8e7387839788e97))

## [0.134.2](https://github.com/maevsi/maevsi/compare/0.134.1...0.134.2) (2022-07-05)


### Bug Fixes

* **button:** use colored variant ([b398688](https://github.com/maevsi/maevsi/commit/b398688519559251598a6f2dda11646e5efc8139))
* **contact-list:** disable own contact deletion ([2943fab](https://github.com/maevsi/maevsi/commit/2943fab87cb9e6d5d2570f3ca142d78452f251cd))
* **event-icon-visibility:** add missing archive parameter ([305b191](https://github.com/maevsi/maevsi/commit/305b1912bb9045a8216bed002fb585b840098de3))
* **feedback:** correct color ([f5df417](https://github.com/maevsi/maevsi/commit/f5df417b02749efe47bc8d88f0c57679071a4b25))
* **form-contact:** test search icon ([c10986f](https://github.com/maevsi/maevsi/commit/c10986fd049a2d9dcf8465edec8ecada71166bd4))
* **form-delete:** specify password type ([b7fc10b](https://github.com/maevsi/maevsi/commit/b7fc10bb8cd940e464b0e4ca3b69ba1c872583d5))
* **form-invitation:** shorten i18n ([6ce4902](https://github.com/maevsi/maevsi/commit/6ce49025655903be18891956aac3cb61b3789913))
* **import:** add missing prop-type imports ([3463fa9](https://github.com/maevsi/maevsi/commit/3463fa9ead5844bdab3a2a4a09a321ee7d8334be))
* **invitation-list:** move send button to beginning ([7a242f3](https://github.com/maevsi/maevsi/commit/7a242f3b7cdc379d903d0bc8ffe337e3db7f3c91))
* **invitation-list:** show stats only with content ([e6d6d84](https://github.com/maevsi/maevsi/commit/e6d6d84777ccd5369b10e69f747af65bcd0c6ae9))
* **invitation:** test different i18n ([10ba81a](https://github.com/maevsi/maevsi/commit/10ba81a5fdd150e9fa46a11c17f961ac8aeef8d2))
* **modal:** prevent enter on disabled submit ([b22a465](https://github.com/maevsi/maevsi/commit/b22a465e9bf5cacb42837d29c4787b9e739f5720))

## [0.134.1](https://github.com/maevsi/maevsi/compare/0.134.0...0.134.1) (2022-07-05)


### Bug Fixes

* **dropdown:** show above overflow container ([285a8cb](https://github.com/maevsi/maevsi/commit/285a8cb6a0e48326d1695ad67a6eb47ae5e5ac7b))

# [0.134.0](https://github.com/maevsi/maevsi/compare/0.133.2...0.134.0) (2022-07-05)


### Bug Fixes

* **components:** correct bright mode background color ([fcd754b](https://github.com/maevsi/maevsi/commit/fcd754bb7bae5f1443918c30ed0af198d19e34b9))
* **drop-down:** remove unnecessary class ([a338602](https://github.com/maevsi/maevsi/commit/a338602105c4e0ac3be1bfae008c5cd1221bdc54))


### Features

* **account:** start with registration ([fa2bf65](https://github.com/maevsi/maevsi/commit/fa2bf6568e082fa36f955dbd109dcb28ca2404d3))
* **event-list:** add icon legend ([af99369](https://github.com/maevsi/maevsi/commit/af993695dc7d7d694716203ed42c58bde3a5fc38))
* **event-list:** hide event unlock button on user's page ([1e23430](https://github.com/maevsi/maevsi/commit/1e2343032c979bad273d01082d1bc398259f8a71))
* **i18n:** improve explanations ([505f2b0](https://github.com/maevsi/maevsi/commit/505f2b097e227d3eb848445007d67ac98003262c))
* **invitation-list:** hide table with no entries ([e33276e](https://github.com/maevsi/maevsi/commit/e33276e6ad7e9216d202168e508e87dbd159db35))
* **swal:** add timer and progressbar to all success modals ([95baae9](https://github.com/maevsi/maevsi/commit/95baae961c7e47a173c21318a8f6328fa3446853))

## [0.133.2](https://github.com/maevsi/maevsi/compare/0.133.1...0.133.2) (2022-07-04)


### Bug Fixes

* **package:** remove ufo from pinned packages ([f22ad19](https://github.com/maevsi/maevsi/commit/f22ad19f540c0ec8b10d9a16202ebf82d505120a))

## [0.133.1](https://github.com/maevsi/maevsi/compare/0.133.0...0.133.1) (2022-07-04)


### Bug Fixes

* **release:** schedule release ([334fa7c](https://github.com/maevsi/maevsi/commit/334fa7c7e1ee97be3917b76785fd9b97087be8fa))

# [0.133.0](https://github.com/maevsi/maevsi/compare/0.132.1...0.133.0) (2022-06-23)


### Features

* **icon:** disallow flex shrinking ([d5d13c4](https://github.com/maevsi/maevsi/commit/d5d13c48cded0d5b524fe0940a03d1ede31b16d9))
* **invitation:** add qr code printing button ([76f0d19](https://github.com/maevsi/maevsi/commit/76f0d19eedb8849b21c59e0c73267821dab342e6))

## [0.132.1](https://github.com/maevsi/maevsi/compare/0.132.0...0.132.1) (2022-06-13)


### Bug Fixes

* overflow fixes ([67a477a](https://github.com/maevsi/maevsi/commit/67a477a6931135fcb70463ba9accf9d553b23758))
* **storycap:** remove actual directory ([5e3ecec](https://github.com/maevsi/maevsi/commit/5e3ecec5789d940276a4c781f351859b407f0f78))

# [0.132.0](https://github.com/maevsi/maevsi/compare/0.131.0...0.132.0) (2022-06-10)


### Bug Fixes

* **contact-preview:** truncate long text in scroll container ([25c2ce1](https://github.com/maevsi/maevsi/commit/25c2ce15f1f021cd219329a6f088d2e8ea764eae))
* **invitation-list:** add dropdown ([072f14c](https://github.com/maevsi/maevsi/commit/072f14c05146f05883d810bb817cd6126f02e581))


### Features

* **docker:** use slim in all stages ([8dfaa0e](https://github.com/maevsi/maevsi/commit/8dfaa0ee0715419375bc698f93cbbff4a3b45d0f))
* **dropdown:** allow close by clicking outside ([f33dc7d](https://github.com/maevsi/maevsi/commit/f33dc7d83d4744c549b427b970a7ac3ef943ba4f))
* **invitation-list:** add link copy button ([60d0e34](https://github.com/maevsi/maevsi/commit/60d0e345c0e6fceec494ae40210bac5ba7739abc))
* **invitation-list:** graph color scheme support ([c902ed9](https://github.com/maevsi/maevsi/commit/c902ed9852d6f566879037e97105e8c658687f0a))
* **invitation-list:** show more buttons on larger screen ([9250df2](https://github.com/maevsi/maevsi/commit/9250df2642c48250685e42fd81db0846f9253db4))
* **menu:** add button menu component ([88f4ba6](https://github.com/maevsi/maevsi/commit/88f4ba6a2082b11338299aa2f97b66fa8455b7de))
* **storycap:** add dockerized script ([be20e75](https://github.com/maevsi/maevsi/commit/be20e75dbcb1f7c8553acd1c3418bb62d9fb149c))
* **storycap:** use sh ([645bb73](https://github.com/maevsi/maevsi/commit/645bb73ce3a3d926017c43fe7891c15667bb9045))

# [0.131.0](https://github.com/maevsi/maevsi/compare/0.130.2...0.131.0) (2022-06-08)


### Bug Fixes

* **event-settings:** make title fully translatable ([9f3f67b](https://github.com/maevsi/maevsi/commit/9f3f67b1e4bc2cca8fe8788b610c19f16c51faa4))
* **form-input-state-success:** add icon ([2f02053](https://github.com/maevsi/maevsi/commit/2f0205374420fa36b51b31cdc1cbdcf58814975f))
* **form-invitation:** correct button text align ([ad8cc5e](https://github.com/maevsi/maevsi/commit/ad8cc5ea8d138f2b6942e3186cf308f324e288e3))


### Features

* **attendance:** improve error messages ([d122060](https://github.com/maevsi/maevsi/commit/d12206033d6ad89071ae8d73fd4e8b2463ffc119))
* **attendance:** prepare qr code print ([a9d4e0f](https://github.com/maevsi/maevsi/commit/a9d4e0f4794e906b7fc6da69ed33678e370eeba8))
* **attendance:** rename to check-in ([ccbebe4](https://github.com/maevsi/maevsi/commit/ccbebe4a25e66a5633a3d0c8ea081d332392d00f)), closes [#649](https://github.com/maevsi/maevsi/issues/649)
* **event:** disable invitation card selection ([ade33ad](https://github.com/maevsi/maevsi/commit/ade33adfd6ae3f0b5cedf3043e3920ec06429ea3))
* **event:** rename settings to edit ([a058065](https://github.com/maevsi/maevsi/commit/a05806554ac4cf33ee239401d7a07e8a689ab3e1))
* **form-invitation:** add button to contact creation ([e0795c4](https://github.com/maevsi/maevsi/commit/e0795c499dd9cc56210dc40847932e4df387ca73)), closes [#651](https://github.com/maevsi/maevsi/issues/651)
* **form-registration:** add existence check for username ([62441e1](https://github.com/maevsi/maevsi/commit/62441e189bb9950d2753681797a5f5bfe7e30ec2)), closes [#647](https://github.com/maevsi/maevsi/issues/647)
* **form:** use link buttons for redirects ([2ae6bbb](https://github.com/maevsi/maevsi/commit/2ae6bbbc057ecd4b08b58ffcea09d8682de24aa7))
* **image-upload-gallery:** add link to upload page ([b36e0a5](https://github.com/maevsi/maevsi/commit/b36e0a5135c2e4554d7b46f7a276b328e1efb913)), closes [#654](https://github.com/maevsi/maevsi/issues/654)
* **invitation:** improve invitation ux ([29d6562](https://github.com/maevsi/maevsi/commit/29d6562006fea76f9197e9e3191c1f493e19608f)), closes [#653](https://github.com/maevsi/maevsi/issues/653)

## [0.130.2](https://github.com/maevsi/maevsi/compare/0.130.1...0.130.2) (2022-06-07)


### Bug Fixes

* **ci:** add push flag ([bcc6379](https://github.com/maevsi/maevsi/commit/bcc6379f9ec12cb64fd11a57fd95fa0bba63e3cf))

## [0.130.1](https://github.com/maevsi/maevsi/compare/0.130.0...0.130.1) (2022-06-07)


### Bug Fixes

* **release:** schedule release ([28c2556](https://github.com/maevsi/maevsi/commit/28c255602ec8a8ad386691e4a57a38b846eda229))

# [0.130.0](https://github.com/maevsi/maevsi/compare/0.129.2...0.130.0) (2022-06-06)


### Bug Fixes

* **font:** update manrope ([381ee0d](https://github.com/maevsi/maevsi/commit/381ee0d8341787a2bc62a19ae129d347469795d8))


### Features

* **pages:** add transition ([59318a9](https://github.com/maevsi/maevsi/commit/59318a90a85f2a89b88f96ef6ff406ded20a1100)), closes [#174](https://github.com/maevsi/maevsi/issues/174)

## [0.129.2](https://github.com/maevsi/maevsi/compare/0.129.1...0.129.2) (2022-06-06)


### Bug Fixes

* **ufo:** resolve to v0.8.4 ([34c3a75](https://github.com/maevsi/maevsi/commit/34c3a757fe186ad8e219328b2a182d787d62a004))

## [0.129.1](https://github.com/maevsi/maevsi/compare/0.129.0...0.129.1) (2022-06-06)


### Bug Fixes

* **form-event:** set maximum datetime ([3edd83d](https://github.com/maevsi/maevsi/commit/3edd83d3e789d7d71bc0ee5cdaa72690cab164f8)), closes [#630](https://github.com/maevsi/maevsi/issues/630)
* **validate:** fetch network only ([27f8698](https://github.com/maevsi/maevsi/commit/27f869883adc4d2705d8b0c85181400f57ffc3ad)), closes [#631](https://github.com/maevsi/maevsi/issues/631)

# [0.129.0](https://github.com/maevsi/maevsi/compare/0.128.0...0.129.0) (2022-06-03)


### Bug Fixes

* **sign-in:** hide redirect notice ([6d5ecd6](https://github.com/maevsi/maevsi/commit/6d5ecd6a2d878be5c773cd9bccdeb57236347fde))


### Features

* **form-input:** rework input design ([c54233a](https://github.com/maevsi/maevsi/commit/c54233a15361c5cb5e7d36bae0f4c761220e22ff)), closes [#339](https://github.com/maevsi/maevsi/issues/339)

# [0.128.0](https://github.com/maevsi/maevsi/compare/0.127.1...0.128.0) (2022-06-01)


### Bug Fixes

* **email-verification:** correct loading indicator ([5f6b31c](https://github.com/maevsi/maevsi/commit/5f6b31c4fb585e0725b8b709a98c65583dd5c54c))
* **graphql:** correct error code property name ([73c467e](https://github.com/maevsi/maevsi/commit/73c467e01b0be9072b42978d8a474dff2615f281))


### Features

* **account:** add success card for email verification ([e2f5659](https://github.com/maevsi/maevsi/commit/e2f56591942229db6c0311d1a65a53d8956d3efd)), closes [#463](https://github.com/maevsi/maevsi/issues/463)
* **i18n:** translate sql RAISE errors ([61a645c](https://github.com/maevsi/maevsi/commit/61a645c6a0174d8d24ed8e019d66b1c258b88da7)), closes [#209](https://github.com/maevsi/maevsi/issues/209)
* rework graphql errors ([8f2b2ed](https://github.com/maevsi/maevsi/commit/8f2b2edacd51af7ee18dba277029a00c1a346b18)), closes [#209](https://github.com/maevsi/maevsi/issues/209) [#338](https://github.com/maevsi/maevsi/issues/338)
* **sqitch:** differentiate error codes ([a7ea4d1](https://github.com/maevsi/maevsi/commit/a7ea4d1e9d94a0929b97e974e9cedbb65eb92365))

## [0.127.1](https://github.com/maevsi/maevsi/compare/0.127.0...0.127.1) (2022-05-31)


### Bug Fixes

* **event:** allow unchanged slug ([c77733b](https://github.com/maevsi/maevsi/commit/c77733b793d2637846ab2a3d05b631117cf62b2b)), closes [#613](https://github.com/maevsi/maevsi/issues/613)
* **form-event:** correct prop type ([d57390a](https://github.com/maevsi/maevsi/commit/d57390aeb1865ae5b4ddd3c64a1c8c162aff75d2))

# [0.127.0](https://github.com/maevsi/maevsi/compare/0.126.2...0.127.0) (2022-05-30)


### Features

* **api:** use public key for verification ([7358fe4](https://github.com/maevsi/maevsi/commit/7358fe48467169114bfc566027e16894c9c1810b))

## [0.126.2](https://github.com/maevsi/maevsi/compare/0.126.1...0.126.2) (2022-05-30)


### Bug Fixes

* **release:** schedule release ([612695f](https://github.com/maevsi/maevsi/commit/612695f9c162d62c947b14dd2832beb94814e6f0))

## [0.126.1](https://github.com/maevsi/maevsi/compare/0.126.0...0.126.1) (2022-05-29)


### Bug Fixes

* **header:** change translations ([6597cdb](https://github.com/maevsi/maevsi/commit/6597cdbf22ca45d9f2efc21fe8c8d85f8f4c0976))
* **release-schedule:** correct job order ([92265ad](https://github.com/maevsi/maevsi/commit/92265ad9eb3bd4104d7106e6f52e38004fae9ef1))
* **release:** schedule release ([7bbedad](https://github.com/maevsi/maevsi/commit/7bbedadde6ad88053943c362caf3b374ec25d900))

# [0.126.0](https://github.com/maevsi/maevsi/compare/0.125.7...0.126.0) (2022-05-27)


### Bug Fixes

* **storycap:** print all changes on test ([9c1f8f1](https://github.com/maevsi/maevsi/commit/9c1f8f1208018bafc45a03bfb013eb88415793d5))


### Features

* **form-input:** implement generic input validation icon ([4e573b1](https://github.com/maevsi/maevsi/commit/4e573b1ed1e6ef728792065066bba8fa18780f91)), closes [#503](https://github.com/maevsi/maevsi/issues/503)

## [0.125.7](https://github.com/maevsi/maevsi/compare/0.125.6...0.125.7) (2022-05-23)


### Bug Fixes

* **release:** schedule release ([93f7a4c](https://github.com/maevsi/maevsi/commit/93f7a4c4387461c8f0facc720d3b198b8c49a801))

## [0.125.6](https://github.com/maevsi/maevsi/compare/0.125.5...0.125.6) (2022-05-16)


### Bug Fixes

* **release:** schedule release ([0c119c0](https://github.com/maevsi/maevsi/commit/0c119c02abab014d0dfaf7296d0a0013ba9709cc))

## [0.125.5](https://github.com/maevsi/maevsi/compare/0.125.4...0.125.5) (2022-05-09)


### Bug Fixes

* **release:** schedule release ([077c809](https://github.com/maevsi/maevsi/commit/077c80969f4444e37ab94d96cef42787cf678c99))

## [0.125.4](https://github.com/maevsi/maevsi/compare/0.125.3...0.125.4) (2022-05-07)


### Bug Fixes

* **css:** correct prose sizes ([3213399](https://github.com/maevsi/maevsi/commit/321339923b903c65a883f1cd3f27ad5093119ad8))

## [0.125.3](https://github.com/maevsi/maevsi/compare/0.125.2...0.125.3) (2022-05-02)


### Bug Fixes

* **release:** schedule release ([204a904](https://github.com/maevsi/maevsi/commit/204a904457376bb8c8c870be77965a4b241e0c90))

## [0.125.2](https://github.com/maevsi/maevsi/compare/0.125.1...0.125.2) (2022-04-25)


### Bug Fixes

* **release:** schedule release ([5be4d25](https://github.com/maevsi/maevsi/commit/5be4d2552055818154c37c5691352d452a40a2d8))

## [0.125.1](https://github.com/maevsi/maevsi/compare/0.125.0...0.125.1) (2022-04-21)


### Bug Fixes

* **api:** migrate to h3 ([3cd94ad](https://github.com/maevsi/maevsi/commit/3cd94ad40c7ac8485bc34c5aa5a9f1d6d3ba116f))
* **api:** remove unused import ([88dcdd0](https://github.com/maevsi/maevsi/commit/88dcdd022b66dd9fcb250d788c4b33bd4e9c298a))
* **image-upload-gallery:** add missing classes ([0eba08a](https://github.com/maevsi/maevsi/commit/0eba08a87d16718918709c0455e9732b80fd0168))
* **modal:** correct modal backdrop ([a6480c1](https://github.com/maevsi/maevsi/commit/a6480c19ae4e27a48c8ec9580f3e2d1c6c88ffb5))

# [0.125.0](https://github.com/maevsi/maevsi/compare/0.124.0...0.125.0) (2022-04-19)


### Bug Fixes

* **docker:** add fonts-dejavu-core ([5fc7285](https://github.com/maevsi/maevsi/commit/5fc72853deaf3611c60680b1940343a9b7265a05))
* **docker:** install procps ([113dc39](https://github.com/maevsi/maevsi/commit/113dc39d3f106e97507108776d9721fb3f1f2937))
* **storycap:** downgrade ([012f0a0](https://github.com/maevsi/maevsi/commit/012f0a0a6abc6dbbb505eb86fedc705afdb50920))


### Features

* **docker:** switch to slim ([db933e2](https://github.com/maevsi/maevsi/commit/db933e2ed7a9b9f2018da96bdb49e3298753e52d))
* **storybook:** resolve component warnings ([d8a12c2](https://github.com/maevsi/maevsi/commit/d8a12c2f36abd2f1761df8b23bb9709be853cb17))


### Reverts

* **storycap:** readd conditional chart display ([81ec2c1](https://github.com/maevsi/maevsi/commit/81ec2c1199d842759d73f1dfb9b2ccd4a87240f3))

# [0.124.0](https://github.com/maevsi/maevsi/compare/0.123.0...0.124.0) (2022-04-18)


### Bug Fixes

* **docker:** copy .git directory ([8b2fcde](https://github.com/maevsi/maevsi/commit/8b2fcdeb368203892ca92a7e56425ae3127d51f1))
* **revert): "feat(docker:** switch to slim" ([b9f3b9d](https://github.com/maevsi/maevsi/commit/b9f3b9d6d5e515a4c7ea28d0194e243e80f46c2c))
* **storycap:** test CI explicitly ([aa9419c](https://github.com/maevsi/maevsi/commit/aa9419c90538bf113ea68e1e542c09cee3508e3e))


### Features

* **deps:** update status-i18n to v0.6.1 ([fbad848](https://github.com/maevsi/maevsi/commit/fbad848d9b143f0856626d1f589120b415dc3eae))
* **docker:** remove host ip ([f4d3eef](https://github.com/maevsi/maevsi/commit/f4d3eefabb4689ac0e44afffa2d3d32b7d1fcc14))
* **docker:** switch to slim ([9988247](https://github.com/maevsi/maevsi/commit/9988247c57942ce0d1deb2e99acb07f035da024f))
* **storycap:** add publish notification ([2ec758f](https://github.com/maevsi/maevsi/commit/2ec758f3946b79aa6933211e21bb6a9b2089b934))
* **storycap:** publish only on CI ([5fef627](https://github.com/maevsi/maevsi/commit/5fef62751d95c357446b4e7f2be83c34c5a81780))

# [0.123.0](https://github.com/maevsi/maevsi/compare/0.122.1...0.123.0) (2022-04-18)


### Bug Fixes

* **docker:** add git directory ([c0265ea](https://github.com/maevsi/maevsi/commit/c0265eab89d5e44feb6eaac69a802145ba366bde))
* **revert): "feat(docker:** switch to slim" ([06d9a2c](https://github.com/maevsi/maevsi/commit/06d9a2ca7fa542caca39199bbfadc8c7d2315eee))
* **revert): "feat(nuxt:** remove dir setter" ([097f45b](https://github.com/maevsi/maevsi/commit/097f45b89d9443d16f444977fa3f028c75cde5df))


### Features

* **docker:** switch to slim ([d3bb080](https://github.com/maevsi/maevsi/commit/d3bb0802fde37651f7298688a35d619ea7a91124))
* **nuxt:** remove dir setter ([dd99064](https://github.com/maevsi/maevsi/commit/dd990646800ec73fcff2ee73267af6060c2d752c))

## [0.122.1](https://github.com/maevsi/maevsi/compare/0.122.0...0.122.1) (2022-04-18)


### Bug Fixes

* **release:** schedule release ([99273cc](https://github.com/maevsi/maevsi/commit/99273cc4a7d354d6e5b854354ab8b385000f0a60))

# [0.122.0](https://github.com/maevsi/maevsi/compare/0.121.0...0.122.0) (2022-04-16)


### Bug Fixes

* **static:** work around nitro issue ([ed164e0](https://github.com/maevsi/maevsi/commit/ed164e09cf0a7c6f78b2e80020d9c7005c7470fb))


### Features

* **chart:** migrate to vue-chartjs ([254b316](https://github.com/maevsi/maevsi/commit/254b316c3c673998a28298293f09ed21b659d3d4))

# [0.121.0](https://github.com/maevsi/maevsi/compare/0.120.1...0.121.0) (2022-04-16)


### Bug Fixes

* **nuxt:** transpile vue-chart-3 ([13979f1](https://github.com/maevsi/maevsi/commit/13979f10eb7c78dbcbc12cd38fc8cc9454393386))


### Features

* **compression:** fix brotli ([0eb77ac](https://github.com/maevsi/maevsi/commit/0eb77ace4b2e31487f756cf0af31bef3ec151bf4))
* **error:** update status-i18n to v0.5.0 ([71011a3](https://github.com/maevsi/maevsi/commit/71011a3bee95020f86c0d7c4a6c48dffe59c3159))

## [0.120.1](https://github.com/maevsi/maevsi/compare/0.120.0...0.120.1) (2022-04-12)


### Bug Fixes

* **api:** correct ical typings ([cf68535](https://github.com/maevsi/maevsi/commit/cf6853506ec8da1fed13d2bdf102b0ce1f3d8e8c))

# [0.120.0](https://github.com/maevsi/maevsi/compare/0.119.8...0.120.0) (2022-04-04)


### Bug Fixes

* **nuxt-bridge:** downgrade ([a500fa2](https://github.com/maevsi/maevsi/commit/a500fa24358bc0a849917c362a535a74f8de03e7))


### Features

* **cookie:** use fork @dargmuesli/nuxt-cookie-control ([86c4ac2](https://github.com/maevsi/maevsi/commit/86c4ac27551e3a002f6b02d978a0ce8829043ee7))

## [0.119.8](https://github.com/maevsi/maevsi/compare/0.119.7...0.119.8) (2022-04-04)


### Bug Fixes

* **storybook:** use babel-loader ([dcb9d22](https://github.com/maevsi/maevsi/commit/dcb9d22b0fca7a7c889f94e5151dc2ff5f217092))

## [0.119.7](https://github.com/maevsi/maevsi/compare/0.119.6...0.119.7) (2022-03-28)


### Bug Fixes

* **release:** schedule release ([f13237b](https://github.com/maevsi/maevsi/commit/f13237bf0b2f2cfb7c9f3d4a700ac248ca8b1545))

## [0.119.6](https://github.com/maevsi/maevsi/compare/0.119.5...0.119.6) (2022-03-14)


### Bug Fixes

* **release:** schedule release ([818c222](https://github.com/maevsi/maevsi/commit/818c222781cbe9685f195a37ac6e470145f6221a))

## [0.119.5](https://github.com/maevsi/maevsi/compare/0.119.4...0.119.5) (2022-03-03)


### Bug Fixes

* **tailwind:** move placeholder styling to components ([c3ff022](https://github.com/maevsi/maevsi/commit/c3ff0227d7921b964edb28748aa57871d46e8ac5))

## [0.119.4](https://github.com/maevsi/maevsi/compare/0.119.3...0.119.4) (2022-02-25)


### Bug Fixes

* **icon-menu:** remove incorrect icon tag ([452b6a7](https://github.com/maevsi/maevsi/commit/452b6a754109fe417c48b994c7fd8057139ff8f5))

## [0.119.3](https://github.com/maevsi/maevsi/compare/0.119.2...0.119.3) (2022-02-14)


### Bug Fixes

* **components:** reorder imports ([19ef504](https://github.com/maevsi/maevsi/commit/19ef50445cd247b070c5399311ede12b57fe3d93))

## [0.119.2](https://github.com/maevsi/maevsi/compare/0.119.1...0.119.2) (2022-02-13)


### Bug Fixes

* **nuxt:** transpile pretty-bytes ([995bf22](https://github.com/maevsi/maevsi/commit/995bf22ccd84968ab43fae0fe33536eee91d1adf))

## [0.119.1](https://github.com/maevsi/maevsi/compare/0.119.0...0.119.1) (2022-02-11)


### Bug Fixes

* **tailwind:** reorder classes ([ab43181](https://github.com/maevsi/maevsi/commit/ab431819c56240c1986cf8b9f2dfbba251e79199))

# [0.119.0](https://github.com/maevsi/maevsi/compare/0.118.4...0.119.0) (2022-02-10)


### Features

* replace font-awesome with separate icons ([7b6af54](https://github.com/maevsi/maevsi/commit/7b6af54a2e7bbdc161794e0147a1bb077a0ec76e))

## [0.118.4](https://github.com/maevsi/maevsi/compare/0.118.3...0.118.4) (2022-02-07)


### Bug Fixes

* **release:** schedule release ([8cfd9c6](https://github.com/maevsi/maevsi/commit/8cfd9c66f216bc2210ecf650b542c488f3aaf24d))

## [0.118.3](https://github.com/maevsi/maevsi/compare/0.118.2...0.118.3) (2022-01-24)


### Bug Fixes

* **release:** schedule release ([d568fbf](https://github.com/maevsi/maevsi/commit/d568fbfdfb19853e2716409836d2807bb1461715))

## [0.118.2](https://github.com/maevsi/maevsi/compare/0.118.1...0.118.2) (2022-01-10)


### Bug Fixes

* **button:** add missing aria labels ([27a439a](https://github.com/maevsi/maevsi/commit/27a439a16fcea81b596ab3c12ccf6bedae8086fa))
* **tiptap:** align preview with result display ([47ed971](https://github.com/maevsi/maevsi/commit/47ed971e4a14d7523ea84a8797c5490449d8f15b))

## [0.118.1](https://github.com/maevsi/maevsi/compare/0.118.0...0.118.1) (2022-01-03)


### Bug Fixes

* **release:** schedule release ([354009b](https://github.com/maevsi/maevsi/commit/354009b8901bf4288280c10dd1eda052d3f33825))

# [0.118.0](https://github.com/maevsi/maevsi/compare/0.117.0...0.118.0) (2021-12-23)


### Bug Fixes

* **app-link:** correct padding ([82d4a83](https://github.com/maevsi/maevsi/commit/82d4a831aeeb328ddd14ff9911a8c57ccddd69be))
* **qr:** add white padding ([2e16f1d](https://github.com/maevsi/maevsi/commit/2e16f1d763908b3f492d65daef305b433d9679d5))


### Features

* **style:** improve dark mode ([e93f368](https://github.com/maevsi/maevsi/commit/e93f3686d9e32df6c7c76e7204c6c5214dfaf846))

# [0.117.0](https://github.com/maevsi/maevsi/compare/0.116.0...0.117.0) (2021-12-22)


### Bug Fixes

* **babel:** exclude core-js ([2509773](https://github.com/maevsi/maevsi/commit/2509773a260eb4f5171b3769df135bb2090e294d))


### Features

* **style:** darken buttons ([c178243](https://github.com/maevsi/maevsi/commit/c1782435d87899747b28b1f8be22087206f05c02))
* **style:** overall tweaks ([03b379a](https://github.com/maevsi/maevsi/commit/03b379afb32fa03e58cc67371e372e0421cdf200))

# [0.116.0](https://github.com/maevsi/maevsi/compare/0.115.0...0.116.0) (2021-12-22)


### Bug Fixes

* **nuxt:** merge css properties ([016303a](https://github.com/maevsi/maevsi/commit/016303a2ce683a8a6b64bd6c2327912169d1f9c5))


### Features

* drop tailwindcss plugin ([6d11e7e](https://github.com/maevsi/maevsi/commit/6d11e7e0964463babe9aabf29857362e0259b3ad))
* **tailwind:** upgrade to v3 ([d81ca01](https://github.com/maevsi/maevsi/commit/d81ca01fbb410bd73e9d32376018bea3503b60e2))

# [0.115.0](https://github.com/maevsi/maevsi/compare/0.114.0...0.115.0) (2021-12-16)


### Features

* **event:** show warning for multiple invitation codes ([d90c7df](https://github.com/maevsi/maevsi/commit/d90c7dfaaa621093ea52b9cacf80f219353c3272))
* **qr:** decrease size ([28220a9](https://github.com/maevsi/maevsi/commit/28220a954c75289666030d74f46968d07e801ead))

# [0.114.0](https://github.com/maevsi/maevsi/compare/0.113.6...0.114.0) (2021-12-15)


### Bug Fixes

* **api:** use new paths ([75bcdb9](https://github.com/maevsi/maevsi/commit/75bcdb96976a862a3d732903f242880fbb71f0c2))
* **invitation:** correct path ([0b46bd9](https://github.com/maevsi/maevsi/commit/0b46bd99519898bc0fb67284a8c6a9633d175ec2))
* **qr-code:** add fallback for no invitation ([65e0265](https://github.com/maevsi/maevsi/commit/65e0265d813a2fd8b65f10cafb03ed3cd0ebbff2))


### Features

* **authentication:** improve error ux ([aacc0db](https://github.com/maevsi/maevsi/commit/aacc0dbdaa20218753338d955cb74e1e574a4a0e))

## [0.113.6](https://github.com/maevsi/maevsi/compare/0.113.5...0.113.6) (2021-12-08)


### Bug Fixes

* **attendance:** correct error handling ([3345936](https://github.com/maevsi/maevsi/commit/3345936165991ad190398ec3d97561237578064c))

## [0.113.5](https://github.com/maevsi/maevsi/compare/0.113.4...0.113.5) (2021-12-08)


### Bug Fixes

* **csp:** remove trailing slashes ([c160b96](https://github.com/maevsi/maevsi/commit/c160b963d133df4ee5883f3185a9b0f862bd0bb9))
* **nuxt:** add missing transpiles ([febec4e](https://github.com/maevsi/maevsi/commit/febec4e6b31524e2b7d98ccd86a09108768ff366))

## [0.113.4](https://github.com/maevsi/maevsi/compare/0.113.3...0.113.4) (2021-12-08)


### Bug Fixes

* **attendance:** import specific component ([b4bb923](https://github.com/maevsi/maevsi/commit/b4bb9239e6ba47df09b8fec04524952b9f1c7dbf))
* **canvas:** replace instead of redirect ([596dd1d](https://github.com/maevsi/maevsi/commit/596dd1d555203bf3029cc5f7be2a8cac341f5162))
* **nfc:** exclude prompt from errors ([1c94338](https://github.com/maevsi/maevsi/commit/1c94338723a73c92a8328f2b6aef679bbddd486f))
* **util:** rename variable to new filename ([d9ac20a](https://github.com/maevsi/maevsi/commit/d9ac20a54a7f14570c5e13cf3e79fde11309bce4))

## [0.113.3](https://github.com/maevsi/maevsi/compare/0.113.2...0.113.3) (2021-12-08)


### Bug Fixes

* **plugin:** rename global plugin ([1f5b440](https://github.com/maevsi/maevsi/commit/1f5b440f63d06cc847de56c7039df337f539fe2e))

## [0.113.2](https://github.com/maevsi/maevsi/compare/0.113.1...0.113.2) (2021-12-07)


### Bug Fixes

* **docker:** correct healthcheck endpoint ([b7e1241](https://github.com/maevsi/maevsi/commit/b7e1241afac30c414b0182b843d8709f572e6607))

## [0.113.1](https://github.com/maevsi/maevsi/compare/0.113.0...0.113.1) (2021-12-07)


### Bug Fixes

* **api:** reenable paths ([d272ef7](https://github.com/maevsi/maevsi/commit/d272ef749810156b682481a0b78c71c710d479bd))
* **server-middleware:** use directories ([2b3e350](https://github.com/maevsi/maevsi/commit/2b3e350c1bf141ca3d0b2e6d6b6863815f4d22ad))

# [0.113.0](https://github.com/maevsi/maevsi/compare/0.112.1...0.113.0) (2021-12-07)


### Bug Fixes

* **get-nested:** remove where possible or required ([9ea1237](https://github.com/maevsi/maevsi/commit/9ea123756b4bf044aada2c8bb3275a92d1a47a6d))
* **storycap:** increase server timeout ([2b407ea](https://github.com/maevsi/maevsi/commit/2b407ea156ee2a5f672e771386640a6d0010a7a3))


### Features

* **nuxt:** add transpiles ([97a4c1d](https://github.com/maevsi/maevsi/commit/97a4c1dc05261d3452afb8c2a7e5c4c015ec6857))
* **plugin:** remove vue-reactive-refs ([2c2d256](https://github.com/maevsi/maevsi/commit/2c2d256bfce7dec62c49c77152fc6e7fd3d61373))

## [0.112.1](https://github.com/maevsi/maevsi/compare/0.112.0...0.112.1) (2021-12-07)


### Bug Fixes

* **package:** readd missing start command ([789eb0c](https://github.com/maevsi/maevsi/commit/789eb0c223135eb2ba32c68ba71cdcd7ea2597ac))

# [0.112.0](https://github.com/maevsi/maevsi/compare/0.111.0...0.112.0) (2021-12-07)


### Bug Fixes

* **git:** add missing gitignore for eslint cache ([f9712be](https://github.com/maevsi/maevsi/commit/f9712be50b59e4552bcc1a59129337562a480423))
* **ts:** disable declaration order rule for nfc types ([74e9ccb](https://github.com/maevsi/maevsi/commit/74e9ccbec2d46eaca1bdf24a9d21c4ba270239af))


### Features

* **attendance:** improve ux ([29c85b1](https://github.com/maevsi/maevsi/commit/29c85b1a573e61da6d143101514ad4457c1d00fe))
* **attendance:** read qr codes, write nfc ([6e132cd](https://github.com/maevsi/maevsi/commit/6e132cda75127166f48859c6da29eb0f1ba6c099))
* improve base components ([e78cbe8](https://github.com/maevsi/maevsi/commit/e78cbe84f863047bee92e2ea8054469510be5c7e))
* **invitation:** add qr code ([c3e67f4](https://github.com/maevsi/maevsi/commit/c3e67f4c96469ce6616aec82337c833c9ac0d24b))
* **invitation:** move path to singular ([f8b44cc](https://github.com/maevsi/maevsi/commit/f8b44ccbfcaded290cad5af701941e277b5e7966))

# [0.111.0](https://github.com/maevsi/maevsi/compare/0.110.1...0.111.0) (2021-12-06)


### Features

* **nuxt:** migrate to bridge ([3cc07ab](https://github.com/maevsi/maevsi/commit/3cc07ab339fea81d89201a6388a564493125d94c))

## [0.110.1](https://github.com/maevsi/maevsi/compare/0.110.0...0.110.1) (2021-12-05)


### Bug Fixes

* **nuxt:** use default export for body parser ([80c0bd0](https://github.com/maevsi/maevsi/commit/80c0bd03bde56ac485b96a8fb08c324823c2954c))

# [0.110.0](https://github.com/maevsi/maevsi/compare/0.109.1...0.110.0) (2021-12-05)


### Bug Fixes

* **config:** correct storybook error ([946cd1f](https://github.com/maevsi/maevsi/commit/946cd1f72e57572c7cc4e9968e37200e64de2bbd))
* **config:** extend transpile array ([e54bf24](https://github.com/maevsi/maevsi/commit/e54bf24bdf05fded7ed5d2153bc9cf56e81e4c26))


### Features

* further typescript migration ([71a4cbe](https://github.com/maevsi/maevsi/commit/71a4cbe177b0ef516b7cf37855578d26be2e0a2f))

## [0.109.1](https://github.com/maevsi/maevsi/compare/0.109.0...0.109.1) (2021-12-04)


### Bug Fixes

* **node-fetch:** add babel plugin for new node prefix ([9c08f23](https://github.com/maevsi/maevsi/commit/9c08f23d80f49bb4912af3afe7304e63370d3759))

# [0.109.0](https://github.com/maevsi/maevsi/compare/0.108.2...0.109.0) (2021-12-02)


### Bug Fixes

* **storycap:** workaround canvas issue ([fe203e5](https://github.com/maevsi/maevsi/commit/fe203e5862dacbb35b7db7d692bc32ae1e98b74e))


### Features

* **invitations:** add pie chart ([1b53f05](https://github.com/maevsi/maevsi/commit/1b53f052c342db6e9f62bf9a3278e130e36d5d65)), closes [#345](https://github.com/maevsi/maevsi/issues/345)

## [0.108.2](https://github.com/maevsi/maevsi/compare/0.108.1...0.108.2) (2021-11-29)


### Bug Fixes

* **components:** add name ([bf81fb4](https://github.com/maevsi/maevsi/commit/bf81fb44ec5b9e2f19264e93e45f177ca454e5a0))
* **release:** schedule release ([4c4fd05](https://github.com/maevsi/maevsi/commit/4c4fd05f553f2e5f621af34796232a16d85c603f))

## [0.108.1](https://github.com/maevsi/maevsi/compare/0.108.0...0.108.1) (2021-11-19)


### Bug Fixes

* **style:** correct typography and event list item background color ([1a258ba](https://github.com/maevsi/maevsi/commit/1a258ba7d322b921e4db82b6bc5cbda9993826e5))

# [0.108.0](https://github.com/maevsi/maevsi/compare/0.107.1...0.108.0) (2021-11-18)


### Bug Fixes

* **contact:** allow addition of username only once ([827ac26](https://github.com/maevsi/maevsi/commit/827ac26c9102520aaffbb3f0f99972f037ac2430)), closes [#477](https://github.com/maevsi/maevsi/issues/477)
* **contact:** url expects https but is prepended ([e2e009a](https://github.com/maevsi/maevsi/commit/e2e009af96fc84d1ec396152ade7c2685440c7db)), closes [#476](https://github.com/maevsi/maevsi/issues/476)
* **cookie:** add declined hook ([81df8a8](https://github.com/maevsi/maevsi/commit/81df8a88b748eefbeccb59cdc0b92a5e03e69182))
* **cookie:** hide confusing cookie names ([e0eb09e](https://github.com/maevsi/maevsi/commit/e0eb09e14ea5c7c4ac1da71e01ef594ed446180c))
* **cookie:** improve interaction with analytics ([ca6ff26](https://github.com/maevsi/maevsi/commit/ca6ff26d470c1bb4e237780add82e38578336180))
* **event:** shorten update confirmation ([96de249](https://github.com/maevsi/maevsi/commit/96de2490d268f3e439149e43e4cb0f67b41750fc))
* **i18n:** improve wording ([eeec91f](https://github.com/maevsi/maevsi/commit/eeec91fa776f156ceadaaf7c1157e79086fb0d14)), closes [#479](https://github.com/maevsi/maevsi/issues/479)
* **ical:** correct test ([828bdd8](https://github.com/maevsi/maevsi/commit/828bdd815847a611062d4149b6958dca2ca72522))
* **ical:** correct test ([4919014](https://github.com/maevsi/maevsi/commit/4919014f1a34ff6b4aaa097cc92f84a0aa49a313))
* **invitation-list:** remove email address from send confirmation ([41f3371](https://github.com/maevsi/maevsi/commit/41f33719789d477f8598f9065e6fe49a1f167b68)), closes [#480](https://github.com/maevsi/maevsi/issues/480)
* **modal:** correct keypress event listening ([fdf270b](https://github.com/maevsi/maevsi/commit/fdf270be20049fbfca954442a241d1b70e9ff4ef)), closes [#473](https://github.com/maevsi/maevsi/issues/473)
* **scroll-container:** load more items, trigger load more earlier ([8ba45cc](https://github.com/maevsi/maevsi/commit/8ba45cc384b939c0aa32f97d91b2938244198609)), closes [#482](https://github.com/maevsi/maevsi/issues/482)


### Features

* **event-settings:** extract invitation management ([ad3cb0a](https://github.com/maevsi/maevsi/commit/ad3cb0a86ee384feb226f9bd80d9b1aa35edd1ce)), closes [#483](https://github.com/maevsi/maevsi/issues/483)
* **header:** switch buttons when logged in ([9d9718a](https://github.com/maevsi/maevsi/commit/9d9718a96fb42081934ad15ceadb3d15194bb7fa))
* **table:** hide columns on smaller screens ([716c60c](https://github.com/maevsi/maevsi/commit/716c60cb7b3838d5e2543ce0c60f61a314385260))

## [0.107.1](https://github.com/maevsi/maevsi/compare/0.107.0...0.107.1) (2021-11-17)


### Bug Fixes

* **event:** cascade username changes ([f944c04](https://github.com/maevsi/maevsi/commit/f944c049a2c1fe75cf661c02de542d94d6b86cda))
* **form-invitation:** make more performant ([c88d591](https://github.com/maevsi/maevsi/commit/c88d5919282d3a4bd2d2a652b11041053cef19ff))
* **menu:** set maximum width ([24e7d5e](https://github.com/maevsi/maevsi/commit/24e7d5e4b9bc5455031071a0287e2aee8815ded4))

# [0.107.0](https://github.com/maevsi/maevsi/compare/0.106.0...0.107.0) (2021-11-17)


### Bug Fixes

* **analytics:** reenable plugin ([af7c244](https://github.com/maevsi/maevsi/commit/af7c2448d3218cb9c1f05213990d3493e467817e))
* **cookies:** add missing google analytics cookie names ([c8f83bd](https://github.com/maevsi/maevsi/commit/c8f83bdb8a7ea41d03cefa864c2afa9548dee82e))
* **event:** correct typing ([074993e](https://github.com/maevsi/maevsi/commit/074993eface89a844a79c3d6f58bd11a5a19d091))
* **types:** correct event contructor ([21c3604](https://github.com/maevsi/maevsi/commit/21c36043490bbbe28b363631a6eb4a1541d328f9))


### Features

* **event:** add templating to event description ([d3c69be](https://github.com/maevsi/maevsi/commit/d3c69be4cd7c4a6474da74d5ba04c589266b87bc)), closes [#118](https://github.com/maevsi/maevsi/issues/118)

# [0.106.0](https://github.com/maevsi/maevsi/compare/0.105.0...0.106.0) (2021-11-17)


### Bug Fixes

* **contact-list:** correct author account username ([b6f507b](https://github.com/maevsi/maevsi/commit/b6f507b33805e1d0027b505e4ce5a7d9acdf7267))
* **event:** check contact existence ([4218f61](https://github.com/maevsi/maevsi/commit/4218f61a172366dbb7fc4f9316984234672676a0))
* **form-event:** improve input layout ([93704a9](https://github.com/maevsi/maevsi/commit/93704a918016a0b2b92fa24aa34f6c95054cfc41))
* **notification:** don't notify for ack'd notifications ([9cfbe3d](https://github.com/maevsi/maevsi/commit/9cfbe3d257ea605c77bc171aed9554ce0a097e31))
* **stylelint:** ignore some browser incompatibility ([687696a](https://github.com/maevsi/maevsi/commit/687696aa7ebbf21e0b73eab99e1d6457e49f0334))
* **stylelint:** use viewbox ([7816e8d](https://github.com/maevsi/maevsi/commit/7816e8dc340edcfe9673f522ab27b0cfe2e5c32a))


### Features

* **invitation:** enable invitees added by username to receive invitation mail ([1e5631a](https://github.com/maevsi/maevsi/commit/1e5631a3ecb0ce378349554610bbde616893a3c9)), closes [#343](https://github.com/maevsi/maevsi/issues/343)
* **memory:** unload uppy and writer ([0c96750](https://github.com/maevsi/maevsi/commit/0c967503ed7a7ca674f6e7deb2f5d71c43276854))
* **scroll-container:** extract to own component ([520fd03](https://github.com/maevsi/maevsi/commit/520fd03e497efa4d151b03458e520f38268fc790))
* **sqitch:** remove now unnecessary tusd access ([8060b34](https://github.com/maevsi/maevsi/commit/8060b34cc38c09cef2a69da6c5113c8a402a05a4))

# [0.105.0](https://github.com/maevsi/maevsi/compare/0.104.0...0.105.0) (2021-11-16)


### Features

* **cookie:** add consent notice ([96bf1ba](https://github.com/maevsi/maevsi/commit/96bf1ba19fa088211dccc113188e6ebe0684144d)), closes [#357](https://github.com/maevsi/maevsi/issues/357)

# [0.104.0](https://github.com/maevsi/maevsi/compare/0.103.1...0.104.0) (2021-11-16)


### Bug Fixes

* **apollo:** correct client clear order ([39dacb4](https://github.com/maevsi/maevsi/commit/39dacb4275431475f1cabc238df3fb764a7d1330))
* **contacts:** correct contact name ordering ([ac5e28d](https://github.com/maevsi/maevsi/commit/ac5e28d1f4cc2ad3da55cb11e27bfe779e718adb))
* **form:** round error border ([fa72935](https://github.com/maevsi/maevsi/commit/fa729357a80ed7453ad1719c18baa5db61a11e2b))
* **menu:** correct visibility for guests ([0ac3fc6](https://github.com/maevsi/maevsi/commit/0ac3fc66fc59f4866f0d9e608c0c85cc292b9116))
* **profile-picture:** use global emit for update ([9e76720](https://github.com/maevsi/maevsi/commit/9e767205d3b428d08c05c98c500263a55be6d184))
* **prose:** fix dark mode ([19d9b49](https://github.com/maevsi/maevsi/commit/19d9b49be5f7808dbfc2c30829d2578b06eb6eb6))
* **storybook:** correct contact directory ([14e880d](https://github.com/maevsi/maevsi/commit/14e880d6d9809c00eeecf332a63dc42c5dbacdd4))
* **uppy:** use named export ([0b399bd](https://github.com/maevsi/maevsi/commit/0b399bdffed90fb24ecfc65daa5eea3c26fe7db3))


### Features

* **account:** move content from settings to profile ([9a0b8f1](https://github.com/maevsi/maevsi/commit/9a0b8f140d42d0940fcf9b11222f15fb6dd0fa69))
* **contact-list:** implement infinite scroll ([be60076](https://github.com/maevsi/maevsi/commit/be60076410ed8361877a2cc9bc68f2bd7ae11155))
* **contact, upload:** add unique endpoints ([55e9183](https://github.com/maevsi/maevsi/commit/55e9183db52510804521525c163a207883b25d6d))
* **error:** improve wording ([43efeb9](https://github.com/maevsi/maevsi/commit/43efeb99f238a83aab8ce8d47a6bef994b04783c))
* **layout:** add canvas ([d849bab](https://github.com/maevsi/maevsi/commit/d849baba44e8cdf1ef8446e66baf181922ec6da2)), closes [#413](https://github.com/maevsi/maevsi/issues/413)
* **layout:** add transitions ([69f1a31](https://github.com/maevsi/maevsi/commit/69f1a31c996e401476cd51e747d7fc651ae9bd7c))
* **menu:** add events link ([334f37e](https://github.com/maevsi/maevsi/commit/334f37e72453372d1c82ec6d1e71bf5d48c646f9))
* **modal:** use sweet alert 2 ([52232fb](https://github.com/maevsi/maevsi/commit/52232fb87632211e619135ece2afce4b37c5900d)), closes [#355](https://github.com/maevsi/maevsi/issues/355)
* **postgraphile:** switch from cursor to offset based navigation ([9aa913f](https://github.com/maevsi/maevsi/commit/9aa913f108aaf24b90d16da55364d43574aace7a))
* **settings:** use error instead of 403 only ([73124e7](https://github.com/maevsi/maevsi/commit/73124e76384851a803c9af3d26d4e944ea8b5f37))
* **sign-in:** use map getters ([2999f10](https://github.com/maevsi/maevsi/commit/2999f103706ef9424ae9dc9aa96996e9c1333531))
* **unlock:** extend query parameters ([e35ba5f](https://github.com/maevsi/maevsi/commit/e35ba5fca3376ab84ab8ac5f578847d0c40be68f))

## [0.103.1](https://github.com/maevsi/maevsi/compare/0.103.0...0.103.1) (2021-11-08)


### Bug Fixes

* **release:** schedule release ([61dc80e](https://github.com/maevsi/maevsi/commit/61dc80e30aab252b0120008500576bb3e3020fb0))

# [0.103.0](https://github.com/maevsi/maevsi/compare/0.102.5...0.103.0) (2021-10-27)


### Features

* **button:** change naming ([580cf84](https://github.com/maevsi/maevsi/commit/580cf844e37e78029fc595b2c5c75be716853e12))
* **tailwind:** move styling to button component ([7369ced](https://github.com/maevsi/maevsi/commit/7369ced35b6864b2d49c52413b634afbcec806df))
* **tailwind:** move styling to card component ([31ce73d](https://github.com/maevsi/maevsi/commit/31ce73d8e41dd5b63ef458211c8c825b46111a31))

## [0.102.5](https://github.com/maevsi/maevsi/compare/0.102.4...0.102.5) (2021-10-26)


### Bug Fixes

* **ci:** check for release instead of create ([0703772](https://github.com/maevsi/maevsi/commit/070377251456cf011521b1c6f7af45ac30df7b06)), closes [#403](https://github.com/maevsi/maevsi/issues/403)

## [0.102.4](https://github.com/maevsi/maevsi/compare/0.102.3...0.102.4) (2021-10-26)


### Bug Fixes

* **ci:** use personal access token in the correct place ([6f341dd](https://github.com/maevsi/maevsi/commit/6f341ddb084890861d253259c42622998c7a536c))

## [0.102.3](https://github.com/maevsi/maevsi/compare/0.102.2...0.102.3) (2021-10-26)


### Bug Fixes

* **ci:** use own access token to trigger release build ([8a30eff](https://github.com/maevsi/maevsi/commit/8a30eff22233abf3f3a609cf5a587f4de068d067))

## [0.102.2](https://github.com/maevsi/maevsi/compare/0.102.1...0.102.2) (2021-10-26)


### Bug Fixes

* **ci:** use published releases ([c6ebbf0](https://github.com/maevsi/maevsi/commit/c6ebbf0752ecde5373c111491e6d970be055f4b7))

## [0.102.1](https://github.com/maevsi/maevsi/compare/0.102.0...0.102.1) (2021-10-26)


### Bug Fixes

* **ci:** trigger on release creation ([1b7e0d6](https://github.com/maevsi/maevsi/commit/1b7e0d6c819c104690d2e4c1db89876646261ef4)), closes [#403](https://github.com/maevsi/maevsi/issues/403)

# [0.102.0](https://github.com/maevsi/maevsi/compare/0.101.2...0.102.0) (2021-10-26)


### Features

* **button:** add button primary ([91a3f80](https://github.com/maevsi/maevsi/commit/91a3f80f152569064b30712a5dd24bc53e473969))

## [0.101.2](https://github.com/maevsi/maevsi/compare/0.101.1...0.101.2) (2021-10-22)


### Bug Fixes

* **stylelint:** add postcss-html ([345cde1](https://github.com/maevsi/maevsi/commit/345cde1c14daa72e2a63b9c42c9873af5f3a53e5))

## [0.101.1](https://github.com/maevsi/maevsi/compare/0.101.0...0.101.1) (2021-10-21)


### Bug Fixes

* adapt stylelint-config-recommended-vue ([25e5042](https://github.com/maevsi/maevsi/commit/25e5042b3ce91b831e098a7ea9432047bda9b13b))

# [0.101.0](https://github.com/maevsi/maevsi/compare/0.100.1...0.101.0) (2021-10-15)


### Bug Fixes

* **event:** display description as prose ([31239d0](https://github.com/maevsi/maevsi/commit/31239d0fd31ac578db8d57fea352170a597fc9b9))


### Features

* **tiptap:** add header and link buttons ([22a6d04](https://github.com/maevsi/maevsi/commit/22a6d04fdfc84837180a1c27bf5f94de131ffee1))

## [0.100.1](https://github.com/maevsi/maevsi/compare/0.100.0...0.100.1) (2021-10-15)


### Bug Fixes

* improve various accessibility issues ([9742184](https://github.com/maevsi/maevsi/commit/97421844c4dd9e655b4205c6bbf5bb64c89975b3))

# [0.100.0](https://github.com/maevsi/maevsi/compare/0.99.5...0.100.0) (2021-10-15)


### Bug Fixes

* **app-link:** centralize classes ([b5b360d](https://github.com/maevsi/maevsi/commit/b5b360d66e16fe905a9614033c786f9ae0271643))
* **app-link:** remove icon property ([1ba5d6c](https://github.com/maevsi/maevsi/commit/1ba5d6cf1bf70514caa9c91736631f84df8e42d8))
* **ical:** adapt new text format ([7e0b064](https://github.com/maevsi/maevsi/commit/7e0b064c09a9e4cfc4ff84012424a8f86238ec95))
* **privacy-policy:** correct typo ([095ff17](https://github.com/maevsi/maevsi/commit/095ff17c02a26a2e052c7f93997ebccf3587815c))
* **tailwind:** centralize prose definition ([938ba74](https://github.com/maevsi/maevsi/commit/938ba74b7308c4eba828b3b58a6ddc54b03e0f52))
* **tiptap:** add missing story ([7425896](https://github.com/maevsi/maevsi/commit/7425896f197b320dfe751562841d68b7dac87379))
* **tiptap:** move css to root ([17c631e](https://github.com/maevsi/maevsi/commit/17c631ee7bd8ea283208513ce981983b0efae33d))


### Features

* add text editor ([b7a91d4](https://github.com/maevsi/maevsi/commit/b7a91d475c3f763ddbbd042448376acf7896bd2e))
* **tailwind:** make focus rounded ([b18bdfc](https://github.com/maevsi/maevsi/commit/b18bdfc3815e2bb9361e4decb6d4db4cb841bf1c))

## [0.99.5](https://github.com/maevsi/maevsi/compare/0.99.4...0.99.5) (2021-10-11)


### Bug Fixes

* **release:** schedule release ([1978182](https://github.com/maevsi/maevsi/commit/19781829c9addafdebdf0c400476b2aa2ba5394c))

## [0.99.4](https://github.com/maevsi/maevsi/compare/0.99.3...0.99.4) (2021-09-27)


### Bug Fixes

* **release:** schedule release ([1c08b22](https://github.com/maevsi/maevsi/commit/1c08b22b5d87832c12a144306f1befa7419ed3fa))

## [0.99.3](https://github.com/maevsi/maevsi/compare/0.99.2...0.99.3) (2021-09-14)


### Bug Fixes

* **docker:** use node 16.9.1 ([b6a39f7](https://github.com/maevsi/maevsi/commit/b6a39f70b3a8769ab9c725755a99d6ce12f3c4c2))

## [0.99.2](https://github.com/maevsi/maevsi/compare/0.99.1...0.99.2) (2021-09-14)


### Bug Fixes

* **docker:** install wget ([78e6960](https://github.com/maevsi/maevsi/commit/78e6960e5b40f4513e8972fc86a415b6fa1f2543))

## [0.99.1](https://github.com/maevsi/maevsi/compare/0.99.0...0.99.1) (2021-09-14)


### Bug Fixes

* **package:** correct types location ([c5bd50b](https://github.com/maevsi/maevsi/commit/c5bd50ba6a9c30df1fead86ff1b7157cc317e81b))

# [0.99.0](https://github.com/maevsi/maevsi/compare/0.98.3...0.99.0) (2021-09-10)


### Features

* **nvm:** update to v16 ([2fb3bc6](https://github.com/maevsi/maevsi/commit/2fb3bc6eb42b3d4a655da8aa6a96ec2d3454d98c))
* remove unnecessary directives ([2148d7f](https://github.com/maevsi/maevsi/commit/2148d7fb64b7cf0c362d4f0520b19fa6414555cf))
* **docker:** use wget for healthcheck ([78eb06d](https://github.com/maevsi/maevsi/commit/78eb06d6f72d2e1157d8241424e24d5d2800a0ef))

## [0.98.3](https://github.com/maevsi/maevsi/compare/0.98.2...0.98.3) (2021-08-31)


### Bug Fixes

* **nuxt:** transpile node-fetch ([a8c67dd](https://github.com/maevsi/maevsi/commit/a8c67dd88dde708b9831f5e1e92d2581df6b7d30))

## [0.98.2](https://github.com/maevsi/maevsi/compare/0.98.1...0.98.2) (2021-08-30)


### Bug Fixes

* minor fixes ([81d1f7d](https://github.com/maevsi/maevsi/commit/81d1f7d889baaa6149b4938c3a096f2b6eb09e6b))
* **image-upload-gallery:** correct uppy and croppa usage ([d26b2b3](https://github.com/maevsi/maevsi/commit/d26b2b3828df1e0a6e0b8dbf799340ba486153c9))

## [0.98.1](https://github.com/maevsi/maevsi/compare/0.98.0...0.98.1) (2021-08-23)


### Bug Fixes

* **release:** schedule release ([4790569](https://github.com/maevsi/maevsi/commit/4790569f71070c91925a0d73f32438f1c588327f))

# [0.98.0](https://github.com/maevsi/maevsi/compare/0.97.0...0.98.0) (2021-08-14)


### Features

* **i18n:** migrate to @nuxtjs/i18n ([331a325](https://github.com/maevsi/maevsi/commit/331a3254277f802dd54f100242853fd6ae8306bf)), closes [#402](https://github.com/maevsi/maevsi/issues/402)

# [0.97.0](https://github.com/maevsi/maevsi/compare/0.96.0...0.97.0) (2021-08-08)


### Bug Fixes

* **modal:** readd getters ([0142ca1](https://github.com/maevsi/maevsi/commit/0142ca120e35e2810b6d50ccdec49e08ecaefe6f))
* **storybook:** define required getters ([37e29ca](https://github.com/maevsi/maevsi/commit/37e29ca927f7a255e9f65ebc307b5a52f2bc4257))


### Features

* **account-contact-list:** use typescript ([1a85708](https://github.com/maevsi/maevsi/commit/1a85708827c56109d3b3aa0786f89959604f4b7f))
* **account-profile-picture:** use typescript ([efbfdf5](https://github.com/maevsi/maevsi/commit/efbfdf5b6d6fdc1766241ea13c84fe200f59ab8d))
* **event-list:** use typescript ([3734a9b](https://github.com/maevsi/maevsi/commit/3734a9b786bd23406bd28925d88a13d30e2cddf8))
* **form:** use typescript ([963c40b](https://github.com/maevsi/maevsi/commit/963c40b2da0972baa9b225a7bd7ed91b3f37b0d9))
* **form-delete:** use typescript ([a7534c9](https://github.com/maevsi/maevsi/commit/a7534c99fe8468bde8ba0fbdd48a1317acea33ae))
* **forms:** use typescript ([6cf01ee](https://github.com/maevsi/maevsi/commit/6cf01ee85eb472fd83a55b7dec532acc0a038721))
* **invitation-list:** use typescript ([77ec6e7](https://github.com/maevsi/maevsi/commit/77ec6e73af83c07ed1f5a10a724d615e1e9f2181))
* **vue:** use defineComponent for all components ([e8076a9](https://github.com/maevsi/maevsi/commit/e8076a9b2c1707c3232883236597072ab0943c8b))
* **vue:** use defineComponent for all pages ([9005e4e](https://github.com/maevsi/maevsi/commit/9005e4eb3a6e0e7791640b1cc058518d5717b928))
* **vue:** use typescript for e-mail verification page ([a5478ad](https://github.com/maevsi/maevsi/commit/a5478ad30df9afb7bf07158312ed4c86217eb41c))
* **vue:** use typescript for event page ([347ebc3](https://github.com/maevsi/maevsi/commit/347ebc3701e7663411706ada78d458d7a3c914c0))
* **vue:** use typescript for event settings page ([da1973d](https://github.com/maevsi/maevsi/commit/da1973d4282e37c431e44d7afb8bf86252803d44))
* **vue:** use typescript for event unlock page ([bcd1373](https://github.com/maevsi/maevsi/commit/bcd1373f3811848f58e3ceb49d718bc06e1d4cda))
* **vue:** use typescript for pages ([bc4088b](https://github.com/maevsi/maevsi/commit/bc4088b2bbe7c1e6f3d433b260296c82048b7f65))
* **vue:** use typescript for remaining components ([1e6a973](https://github.com/maevsi/maevsi/commit/1e6a973db46fa4719fe8af5ddc318392bc406437))

# [0.96.0](https://github.com/maevsi/maevsi/compare/0.95.0...0.96.0) (2021-08-08)


### Features

* **storybook:** use typescript for stories ([0a2c12c](https://github.com/maevsi/maevsi/commit/0a2c12c4f3d21d7718351865fe907b34b7c0f042))

# [0.95.0](https://github.com/maevsi/maevsi/compare/0.94.3...0.95.0) (2021-08-07)


### Bug Fixes

* **storycap:** correct dockerfile ([6db1a6d](https://github.com/maevsi/maevsi/commit/6db1a6dfcde1bfebed277158f2991f9fa1213b9d))


### Features

* **error:** use twemoji ([2eb7446](https://github.com/maevsi/maevsi/commit/2eb74469f1e78b7a98ef44e60483b2224602ecdd)), closes [#287](https://github.com/maevsi/maevsi/issues/287)

## [0.94.3](https://github.com/maevsi/maevsi/compare/0.94.2...0.94.3) (2021-08-05)


### Bug Fixes

* **color-mode:** install dependency as such ([6c2030b](https://github.com/maevsi/maevsi/commit/6c2030ba2a0d157cca0c4c6b0026e86256184179))

## [0.94.2](https://github.com/maevsi/maevsi/compare/0.94.1...0.94.2) (2021-08-04)


### Bug Fixes

* **color-mode:** use as normal module ([fad45f0](https://github.com/maevsi/maevsi/commit/fad45f0871efab6df6abdace09dbc90419e1e361))

## [0.94.1](https://github.com/maevsi/maevsi/compare/0.94.0...0.94.1) (2021-08-04)


### Bug Fixes

* **husky:** allow renovate to push on master ([b484769](https://github.com/maevsi/maevsi/commit/b48476910d127266d0657b82b0ac04bfd9934d41))

# [0.94.0](https://github.com/maevsi/maevsi/compare/0.93.1...0.94.0) (2021-08-04)


### Bug Fixes

* **vue:** use correct type for dates of events ([328eb27](https://github.com/maevsi/maevsi/commit/328eb27d1b70e9aebe7174dba9c73af3cbdd7043))


### Features

* **vue:** use typescript for button components ([eb8e658](https://github.com/maevsi/maevsi/commit/eb8e6580563b1993bd9ea68475f1fbf1dcd080a2))
* **vue:** use typescript for card components ([933fe3f](https://github.com/maevsi/maevsi/commit/933fe3fa1a3b1d8bf95dcc3351c10ec24572c90c))
* **vue:** use typescript for contact components ([cc8ee2a](https://github.com/maevsi/maevsi/commit/cc8ee2aa48b346dfc375fc441069f637a31fdf82))
* **vue:** use typescript for event components ([74e4d6f](https://github.com/maevsi/maevsi/commit/74e4d6f05339ce64b4ddadb1eacba9c242d2c98d))
* **vue:** use typescript for form components ([c6ba3d2](https://github.com/maevsi/maevsi/commit/c6ba3d20b62e4005d940b946471a11cfef7eec56))
* **vue:** use typescript for invitation components ([a356002](https://github.com/maevsi/maevsi/commit/a356002e5bdc0856ead99ede72154acb3c309990))
* **vue:** use typescript for loader components ([d17378c](https://github.com/maevsi/maevsi/commit/d17378cea7e8d63e78038d992b4f6e52bcc7a9ac))
* **vue:** use typescript for modal components ([6b21fce](https://github.com/maevsi/maevsi/commit/6b21fce5f4a086d52719f39393a82dec75f2a0ef))
* **vue:** use typescript for top-level components ([572b114](https://github.com/maevsi/maevsi/commit/572b11497118edb05c53b47b2c064b1099939709))

## [0.93.1](https://github.com/maevsi/maevsi/compare/0.93.0...0.93.1) (2021-08-03)


### Bug Fixes

* **types:** move to modules ([12748b5](https://github.com/maevsi/maevsi/commit/12748b5dd20f9cf46b538e1716c28d8393a68c61))

# [0.93.0](https://github.com/maevsi/maevsi/compare/0.92.0...0.93.0) (2021-08-03)


### Bug Fixes

* **storycap:** remove unused dependency ([0bedd7a](https://github.com/maevsi/maevsi/commit/0bedd7a8c4af046390d75fb18d2eed036197410b))


### Features

* **design:** add color scheme selection ([daefb54](https://github.com/maevsi/maevsi/commit/daefb540919cdec9b5a9d6bc84d1d97674b35044)), closes [#123](https://github.com/maevsi/maevsi/issues/123)

# [0.92.0](https://github.com/maevsi/maevsi/compare/0.91.0...0.92.0) (2021-08-03)


### Bug Fixes

* update plugin types to fully support nuxt typings ([727e8db](https://github.com/maevsi/maevsi/commit/727e8dba373fcc0e71c64cb84fece0d723e22414))


### Features

* use typescript for layouts ([b9a4b1e](https://github.com/maevsi/maevsi/commit/b9a4b1ed58132966faa9ad81fdc858792c29eba9))
* use typescript for pages ([1da42d9](https://github.com/maevsi/maevsi/commit/1da42d9657045b931d3131b6981fba5d705698f9))

# [0.91.0](https://github.com/maevsi/maevsi/compare/0.90.2...0.91.0) (2021-08-03)


### Bug Fixes

* **docker:** add jq for storycap ([1900528](https://github.com/maevsi/maevsi/commit/1900528b3f7e2407e90e090d49e18901fbccbe58))
* **docker:** add puppeteer dependencies ([ab4eabc](https://github.com/maevsi/maevsi/commit/ab4eabc5fbf163fca9fcd3f53437367e221cfacf))


### Features

* **storycap:** migrate away from creevey ([c3ab844](https://github.com/maevsi/maevsi/commit/c3ab844073f093ea61921f66308e51c0fd4c8cc3))

## [0.90.2](https://github.com/maevsi/maevsi/compare/0.90.1...0.90.2) (2021-08-03)


### Bug Fixes

* **nuxt:** transpile .mjs ([3f888f3](https://github.com/maevsi/maevsi/commit/3f888f3d28e6a8805cd0ad53bd389c6e98ee1a67))

## [0.90.1](https://github.com/maevsi/maevsi/compare/0.90.0...0.90.1) (2021-08-03)


### Bug Fixes

* **button:** improve optional class addition ([f67f08d](https://github.com/maevsi/maevsi/commit/f67f08dd9abb67134f3cca44b97d67f63adc5233))

# [0.90.0](https://github.com/maevsi/maevsi/compare/0.89.0...0.90.0) (2021-07-29)


### Bug Fixes

* **index:** improve responsiveness ([f235752](https://github.com/maevsi/maevsi/commit/f235752f2e02bd34fcdd20f7ee5e1cccafc3f432))
* **tab-flip:** add border ([b20390e](https://github.com/maevsi/maevsi/commit/b20390e7321d4be9e355cb53fd3840494ea06d07))


### Features

* **card:** improve design ([8e11d81](https://github.com/maevsi/maevsi/commit/8e11d81cc93107bb380929282de46f15867146b5))
* **creevey:** update images ([550de6d](https://github.com/maevsi/maevsi/commit/550de6d1105210a5f21b4e4eb8c8f94d651afb29))
* **creevey:** update images ([46c660e](https://github.com/maevsi/maevsi/commit/46c660e0241f278096e334e08727aac466e656c3))
* **header:** add action buttons ([fb64a0d](https://github.com/maevsi/maevsi/commit/fb64a0d6d6a934a2be134e703b2087a0bce70b1c))
* **header:** improve design ([86f65d9](https://github.com/maevsi/maevsi/commit/86f65d95c09d4a532a4d17a3905468e30ecdc2d6))
* **menu:** design with sidebar ([69dc8e4](https://github.com/maevsi/maevsi/commit/69dc8e4704eb19f3cf3ad48f4f482cb15d6a7008))
* **menu:** improve sidebar design ([1f6bb5d](https://github.com/maevsi/maevsi/commit/1f6bb5de3ae07a1bf82649945d08d7264fca4b12))
* **profile-picture:** round edges ([7e8268a](https://github.com/maevsi/maevsi/commit/7e8268a0d6c8d16e3a1e5c0277ecea222b4052ea))
* **tailwind:** switch background colors ([0b99f96](https://github.com/maevsi/maevsi/commit/0b99f9660cd168383199305885fb0a7e54bf47a1))

# [0.89.0](https://github.com/maevsi/maevsi/compare/0.88.0...0.89.0) (2021-07-28)


### Bug Fixes

* **global:** fallback to empty jwt string ([9f00f30](https://github.com/maevsi/maevsi/commit/9f00f30ddfec0c67a5c5325ab704cedb88874eed))


### Features

* **vue:** use typescript for plugins ([17bfbc7](https://github.com/maevsi/maevsi/commit/17bfbc703d6c7fa3dfb896940d9814a8e5347cd7))

# [0.88.0](https://github.com/maevsi/maevsi/compare/0.87.2...0.88.0) (2021-07-28)


### Features

* **husky:** prevent pushes to master instead of testing in pre-push ([fbb99f0](https://github.com/maevsi/maevsi/commit/fbb99f01b8b60ad8dbe53b5bc7fba66d3adf6d31))

## [0.87.2](https://github.com/maevsi/maevsi/compare/0.87.1...0.87.2) (2021-07-27)


### Bug Fixes

* nuxt/package.json & nuxt/yarn.lock to reduce vulnerabilities ([e6cfcb5](https://github.com/maevsi/maevsi/commit/e6cfcb5e58590c36b5bf84c461a18c504186c8da))

## [0.87.1](https://github.com/maevsi/maevsi/compare/0.87.0...0.87.1) (2021-07-26)


### Bug Fixes

* **release:** schedule release ([cffdfde](https://github.com/maevsi/maevsi/commit/cffdfde0970a3b3ca2bdd4338815ebf7f1af3348))

# [0.87.0](https://github.com/maevsi/maevsi/compare/0.86.0...0.87.0) (2021-07-15)


### Features

* **creevey:** use chrome only ([eea4eec](https://github.com/maevsi/maevsi/commit/eea4eec6a597821d1a6a4958b80d27c9cdc6085b))
* **form-input:** add verifiability ([b4df9d8](https://github.com/maevsi/maevsi/commit/b4df9d8c5b1263274f949a59232f8b91887a69ed)), closes [#252](https://github.com/maevsi/maevsi/issues/252)
* **form-input-username:** make verification optional ([ebc89eb](https://github.com/maevsi/maevsi/commit/ebc89ebc03c7875c03ca2a5b9712ed5ddf19b588))
* **invitation-list:** display invitation code on lg ([df20767](https://github.com/maevsi/maevsi/commit/df2076737f80dbe0b444a217ff4b5c2c57bfe5a0))
* **modal:** improve heading ([ff58fda](https://github.com/maevsi/maevsi/commit/ff58fda2ebe0cd5aa2b71a8f79b4cd92c4d05726))

# [0.86.0](https://github.com/maevsi/maevsi/compare/0.85.0...0.86.0) (2021-07-14)


### Bug Fixes

* **cookie:** support foreign links to meavsi ([adc9aef](https://github.com/maevsi/maevsi/commit/adc9aef31ef3bc42fbfe46717faad75620f2e0d1)), closes [#316](https://github.com/maevsi/maevsi/issues/316)
* **event:** show invitations for invitees again ([cbf5bcf](https://github.com/maevsi/maevsi/commit/cbf5bcf4113890c4e1b808fe164db84a2357e29d)), closes [#344](https://github.com/maevsi/maevsi/issues/344)
* **form-input-password:** correct typo ([8f4c09c](https://github.com/maevsi/maevsi/commit/8f4c09c66693f1585cd48e5939e661b07a53d505))


### Features

* **contact:** redesign contact views ([cd98218](https://github.com/maevsi/maevsi/commit/cd9821816bc284939e84feec63ac58cb62054313))
* **contact-preview:** improve display ([c0a9329](https://github.com/maevsi/maevsi/commit/c0a9329b9634fd5a7119bd510a1d3c89a7e2d547))
* **event:** display event title instead of slug in tab title ([3a06713](https://github.com/maevsi/maevsi/commit/3a067136391d851c06219dff8873664cd53b1a06)), closes [#342](https://github.com/maevsi/maevsi/issues/342)
* **event-icon-visibility:** add visual test ([7d3d41b](https://github.com/maevsi/maevsi/commit/7d3d41b0f8f7756c51eab3393c42225f96bc722c))
* **event-settings:** display event title instead of slug ([0ec860f](https://github.com/maevsi/maevsi/commit/0ec860f2cae71ec8aa2c118301ae452c1f8d9b20))
* **focus:** align focus styling ([0a61292](https://github.com/maevsi/maevsi/commit/0a61292f250b49df62c9ad0c234be34ca50be073))
* **form:** improve styling ([b4f60d4](https://github.com/maevsi/maevsi/commit/b4f60d4462736cf0ac00e1eacf5932df894bf705))
* **form-checkbox:** style rounded ([4b8322a](https://github.com/maevsi/maevsi/commit/4b8322a1eb324416f805a183bf8abc49a9b008d4))
* **form-input-url:** replace validation with prefix ([c1c79cd](https://github.com/maevsi/maevsi/commit/c1c79cd811a97600ec6fc4eb0bda03e7d57df0cf))
* **form-invitation:** use single contact selection ([68c377c](https://github.com/maevsi/maevsi/commit/68c377cf4935dc7f331d93913868e065722d8d0a))
* **image-upload-gallery:** improve button styling ([b3a510b](https://github.com/maevsi/maevsi/commit/b3a510bfbac20cd0f73a59e10ec16b5c9558cc41))
* **invitation:** improve contact selection ([c897c8b](https://github.com/maevsi/maevsi/commit/c897c8b8718af5a1d3796953dd5f3457fe24b0aa)), closes [#197](https://github.com/maevsi/maevsi/issues/197)
* **nuxt:** improve class usage ([352a3ac](https://github.com/maevsi/maevsi/commit/352a3ac64fa53d173e833cb4ceb004aabddc5537))
* **storybook:** use environment variable instead of property ([b60c4f6](https://github.com/maevsi/maevsi/commit/b60c4f639c232a7c1f605ae9dbe98e98e974fb2b))
* **tailwind:** set external link icon to current color ([a80d86a](https://github.com/maevsi/maevsi/commit/a80d86a2dfc298c621603dd20b28980a8d9ebc0e))

# [0.85.0](https://github.com/maevsi/maevsi/compare/0.84.0...0.85.0) (2021-07-14)


### Bug Fixes

* **form-input-password:** correct typo ([4b41e1d](https://github.com/maevsi/maevsi/commit/4b41e1d343d6397f1d80581c8ed5f9c1db1c17de))


### Features

* **event:** display event title instead of slug in tab title ([932b5d9](https://github.com/maevsi/maevsi/commit/932b5d92f7902e337ecc6bfe4226c6f40a51611f)), closes [#342](https://github.com/maevsi/maevsi/issues/342)
* **event-icon-visibility:** add visual test ([fb2725d](https://github.com/maevsi/maevsi/commit/fb2725dffc5d62c82899e7c62d12a037d6f8773a))
* **storybook:** use environment variable instead of property ([99364e8](https://github.com/maevsi/maevsi/commit/99364e8bae2aaa7d7cf93c5e2bb982506adc7c87))

# [0.84.0](https://github.com/maevsi/maevsi/compare/0.83.0...0.84.0) (2021-07-12)


### Bug Fixes

* **card:** hide overflow ([96b6f57](https://github.com/maevsi/maevsi/commit/96b6f576ad3fa2f1bf3271174b2ce4a4442c56ee))
* **card:** remove explicit form label color ([80da1a9](https://github.com/maevsi/maevsi/commit/80da1a9ed5893cded94b3e3429b2550e437d4252))
* **event-list-item:** correct opacity ([b589d8b](https://github.com/maevsi/maevsi/commit/b589d8ba3d967afbf102683b9f5937754913c016))
* **image-upload-gallery:** only fetch account info when logged in ([f01f860](https://github.com/maevsi/maevsi/commit/f01f860f45df590d1315db802a3225967611ba1c))
* **image-upload-gallery:** return on invalid parameters ([680cb51](https://github.com/maevsi/maevsi/commit/680cb51f61a7ac835668c1514f8be11ef2269e48))
* **storybook:** correct spelling ([3837b71](https://github.com/maevsi/maevsi/commit/3837b713b1e7e479e83cf0600419436870c50f1c))


### Features

* **account:** add contact management ([2e63f1d](https://github.com/maevsi/maevsi/commit/2e63f1d68ec23e66e04cbdebb0dfcccd330bff75)), closes [#195](https://github.com/maevsi/maevsi/issues/195)
* **contact:** add phone number ([47b8396](https://github.com/maevsi/maevsi/commit/47b839635262fc9f823bfa33d148ee814432e22f)), closes [#328](https://github.com/maevsi/maevsi/issues/328)
* **contact:** display profile pictures ([dcaeb26](https://github.com/maevsi/maevsi/commit/dcaeb2625f2845616ff9d714b4f2a509c35833eb)), closes [#119](https://github.com/maevsi/maevsi/issues/119)
* **email:** prevent uppercase letters ([a40fade](https://github.com/maevsi/maevsi/commit/a40fade44616b57843781eb929ac22ec37405bf1))
* **event:** redirect to settings page after invitation preview ([7c66c38](https://github.com/maevsi/maevsi/commit/7c66c38c017fbdf71bbd38adc2ebd585644af387))
* **font:** add Manrope 500 ([70e8a83](https://github.com/maevsi/maevsi/commit/70e8a831b9eabb448e49a68bc1d2e5377eb7a0a1))
* **form:** adapt optional fields for forms ([16619de](https://github.com/maevsi/maevsi/commit/16619dec6d70455e0225697d867f39581bea665d))
* **gql:** add nodeId ([0f002fd](https://github.com/maevsi/maevsi/commit/0f002fdc765c3f6ce599816c1726cbe1f7707d2d))
* **gql:** align query/mutation naming ([d792be7](https://github.com/maevsi/maevsi/commit/d792be7476936156d6a563cb95c29a2dd6d3ed27))
* **image-upload-gallery:** show used and total disk space ([b5142d4](https://github.com/maevsi/maevsi/commit/b5142d47a1e539f6bb417d4448f6e75571231386)), closes [#311](https://github.com/maevsi/maevsi/issues/311)
* **invitation:** separate contact creation from invitation ([06777f4](https://github.com/maevsi/maevsi/commit/06777f417edb7e3512d9269727aae5efa54e3a5e)), closes [#196](https://github.com/maevsi/maevsi/issues/196)

# [0.83.0](https://github.com/maevsi/maevsi/compare/0.82.1...0.83.0) (2021-07-12)


### Bug Fixes

* **tailwind:** correct display of strong text ([8832086](https://github.com/maevsi/maevsi/commit/8832086a32f390bfd33c30985f73c9461a4e87b9)), closes [#341](https://github.com/maevsi/maevsi/issues/341)


### Features

* **account:** add new password confirmation input ([41d0cb5](https://github.com/maevsi/maevsi/commit/41d0cb510f7cb33b044ce8cac28dbe3d56080593))
* **account:** align account deletion heading ([078d9c7](https://github.com/maevsi/maevsi/commit/078d9c7b83eab4fec5db11b234a91c39643091b2))
* **account:** clear password change form on success ([953c8ab](https://github.com/maevsi/maevsi/commit/953c8abe9843895ff5df752af215360e3bbc549e)), closes [#340](https://github.com/maevsi/maevsi/issues/340)
* **creevey:** update images ([1afe719](https://github.com/maevsi/maevsi/commit/1afe71916177fe240ab45ad91a5eaba332fb8fdd))
* **form:** tweak display of meta information ([29e6bc3](https://github.com/maevsi/maevsi/commit/29e6bc317def00b62bf0b7e969c6882c3c60fcf1))

## [0.82.1](https://github.com/maevsi/maevsi/compare/0.82.0...0.82.1) (2021-07-07)


### Bug Fixes

* **storybook:** use serverMiddleware object notation ([492a187](https://github.com/maevsi/maevsi/commit/492a1876d827fb9c453ae960e28bc9728c93eed8))

# [0.82.0](https://github.com/maevsi/maevsi/compare/0.81.0...0.82.0) (2021-07-06)


### Features

* **husky:** migrate to v7 ([bc7e27a](https://github.com/maevsi/maevsi/commit/bc7e27aef48a1260b350ecd8b68b620e5de3fe5f))

# [0.81.0](https://github.com/maevsi/maevsi/compare/0.80.0...0.81.0) (2021-07-01)


### Bug Fixes

* **csp:** add analytics to img-src ([bc0cc00](https://github.com/maevsi/maevsi/commit/bc0cc004c13a830a0ea9c02e88289508f9d6ca3e))
* **middleware:** check res for existence ([2fedcf8](https://github.com/maevsi/maevsi/commit/2fedcf8faf183991bb75d25988522ab102d65070))


### Features

* rename graphql error variables ([f3a30ea](https://github.com/maevsi/maevsi/commit/f3a30ea3c29e79f5e166658068c3bf58fd3228b0))
* **contact:** add url ([6208447](https://github.com/maevsi/maevsi/commit/6208447846bcd193e3a2f322667e0eb853c1b283)), closes [#93](https://github.com/maevsi/maevsi/issues/93)
* **modal:** remove form workaround ([89fe3d7](https://github.com/maevsi/maevsi/commit/89fe3d79414eb0856a20a8d84b83f0de40c01071))

# [0.80.0](https://github.com/maevsi/maevsi/compare/0.79.0...0.80.0) (2021-06-30)


### Features

* **sql:** readd json prettification ([55b2cb1](https://github.com/maevsi/maevsi/commit/55b2cb1ff33b37d249f38814990d381b00973553))

# [0.79.0](https://github.com/maevsi/maevsi/compare/0.78.0...0.79.0) (2021-06-30)


### Bug Fixes

* **creevey:** increase diff threshold ([af7b719](https://github.com/maevsi/maevsi/commit/af7b719b4f9cf4839f9aa036369d8f85f1ae4eec))
* **image:** set height and width explicitly ([529c670](https://github.com/maevsi/maevsi/commit/529c67076fc42131c92436894130f7482cf4e6ac))
* **index:** use png images ([c3f3df4](https://github.com/maevsi/maevsi/commit/c3f3df425e728c4737541bff61dbecd33ea7509e))
* **modal:** correct loading indicator position & size ([739f92c](https://github.com/maevsi/maevsi/commit/739f92cea844deb29d9c91c6886edaa0ca516cda))


### Features

* **analytics:** use nuxt analytics plugin instead of gtag ([2bab6c2](https://github.com/maevsi/maevsi/commit/2bab6c29eee9de30a2c2bdd3e823ff767a486154))
* **button:** make aria label required ([7d3094a](https://github.com/maevsi/maevsi/commit/7d3094a8117f93035354dfab3e6b1bb8d0e8b458))
* **form:** style warning like error ([381a9cc](https://github.com/maevsi/maevsi/commit/381a9ccdeb4ae8e2b7f110ea816f244baf6f4f3c))

# [0.78.0](https://github.com/maevsi/maevsi/compare/0.77.0...0.78.0) (2021-06-29)


### Features

* **selenium:** add more test nodes with different screen resolutions ([72fbb71](https://github.com/maevsi/maevsi/commit/72fbb712bd72655c456651dddf27a603347252f3)), closes [#291](https://github.com/maevsi/maevsi/issues/291)

# [0.77.0](https://github.com/maevsi/maevsi/compare/0.76.0...0.77.0) (2021-06-28)


### Bug Fixes

* **form-delete:** correct modal closing function ([fcb7a71](https://github.com/maevsi/maevsi/commit/fcb7a716439fd72003efef27a3c8e0dfebfd30dc)), closes [#315](https://github.com/maevsi/maevsi/issues/315)


### Features

* **account:** display notice that login is required ([a00867c](https://github.com/maevsi/maevsi/commit/a00867c60ad0955408c9836f848c0a70ad5ba10c)), closes [#314](https://github.com/maevsi/maevsi/issues/314)
* **form-delete:** remove id property ([b8c922d](https://github.com/maevsi/maevsi/commit/b8c922d4884d5eb503a421a8bcf0bd7d10e50d86))
* **notification:** add acknowledgement function ([fc449ad](https://github.com/maevsi/maevsi/commit/fc449ad2b5ef21183e390e39e947fbd208cbb98f))
* **sql:** remove json prettification ([53765fb](https://github.com/maevsi/maevsi/commit/53765fb88c619cca9e0f56c6ebb496538e4de4c5))

# [0.76.0](https://github.com/maevsi/maevsi/compare/0.75.2...0.76.0) (2021-06-26)


### Bug Fixes

* **event-list-item:** remove duplicate class ([69582d6](https://github.com/maevsi/maevsi/commit/69582d6945e822b3ab40b2af08f21f4f667c8320))
* **tab-flip:** correct query parameter ([d375fa5](https://github.com/maevsi/maevsi/commit/d375fa502c33d0cf5bf439f792275f779f37e964))


### Features

* **event:** add invitation view ([d4f1fb9](https://github.com/maevsi/maevsi/commit/d4f1fb90b6a6598b8993680867e54bf13f7673b5)), closes [#240](https://github.com/maevsi/maevsi/issues/240)
* **event:** order events query by start descending ([3b819a5](https://github.com/maevsi/maevsi/commit/3b819a5a5ab75624eb6245aa50f2db895222455c))
* **event-settings:** shorten deletion headings ([2132d7d](https://github.com/maevsi/maevsi/commit/2132d7d8e3649c607b865680e2430ee3111cc550))

## [0.75.2](https://github.com/maevsi/maevsi/compare/0.75.1...0.75.2) (2021-06-24)


### Bug Fixes

* **event:** readd apollo smart query ([9870a79](https://github.com/maevsi/maevsi/commit/9870a79f1aa8c91c6b4b4d35a945e191f295a1f1))

## [0.75.1](https://github.com/maevsi/maevsi/compare/0.75.0...0.75.1) (2021-06-24)


### Bug Fixes

* **app-link:** correct i18n paths ([026cf20](https://github.com/maevsi/maevsi/commit/026cf20c1eb16f8383b944e468135332c44c731f)), closes [#313](https://github.com/maevsi/maevsi/issues/313)
* **button-sign-in:** prevent redirection after verification ([6a4253f](https://github.com/maevsi/maevsi/commit/6a4253f855647689599a2e11d517326fe16b0559)), closes [#312](https://github.com/maevsi/maevsi/issues/312)
* **form-input:** correct padding ([fcac1b7](https://github.com/maevsi/maevsi/commit/fcac1b72a8af22aeaf01f72e7cc066ad9e36a45d))

# [0.75.0](https://github.com/maevsi/maevsi/compare/0.74.0...0.75.0) (2021-06-17)


### Features

* **image-upload-gallery:** improve alternative text for failed uploads ([d53d5ab](https://github.com/maevsi/maevsi/commit/d53d5ab1628fbbd4f60353c9c20cb9f9cb301ba6))
* **loader-indication-spinner:** improve icon ([c8dc23a](https://github.com/maevsi/maevsi/commit/c8dc23a5fb437f49a9f8a6c0753f9a16fe5012e5))
* **modal:** add loading indicator or submit ([4f69980](https://github.com/maevsi/maevsi/commit/4f6998060d8e266c0dc535d1d071cf165fb07299)), closes [#45](https://github.com/maevsi/maevsi/issues/45)
* **tailwind:** upgrade ([69cd64e](https://github.com/maevsi/maevsi/commit/69cd64e77602b9ab3ef8198124e104ffb0cef227))
* **twitter:** add meta tags ([4947486](https://github.com/maevsi/maevsi/commit/494748680e35e67579a177684740259e667a4c0f))

# [0.74.0](https://github.com/maevsi/maevsi/compare/0.73.0...0.74.0) (2021-06-17)


### Features

* **open-graph:** set title and url tags on every page ([ee9d16b](https://github.com/maevsi/maevsi/commit/ee9d16bf442eb64665eac8eb1c3fedf6d207dbdc)), closes [#88](https://github.com/maevsi/maevsi/issues/88)

# [0.73.0](https://github.com/maevsi/maevsi/compare/0.72.0...0.73.0) (2021-06-17)


### Bug Fixes

* **tailwind:** correct prose sizing ([4b0e05e](https://github.com/maevsi/maevsi/commit/4b0e05e5c8645a0078566d7f1cc166414ca9ec24))
* **tailwind:** make strong text visible in dark mode ([99c5563](https://github.com/maevsi/maevsi/commit/99c556381d0b6d247f31821a3a034d5b3ed0e428))


### Features

* **eslint:** disallow raw text ([9144a1c](https://github.com/maevsi/maevsi/commit/9144a1c63f6f496fd9ee798cb597e792fd4c72dd))
* **event-list:** reorder buttons ([8589fe1](https://github.com/maevsi/maevsi/commit/8589fe12261f068b0deb3081d64dacf7f343d6a7))
* **footer:** add support mail link ([18dcf73](https://github.com/maevsi/maevsi/commit/18dcf7309c2c98875c0578a9c8e93b0063864199)), closes [#306](https://github.com/maevsi/maevsi/issues/306)
* **form-event:** warn in past start date ([08b7793](https://github.com/maevsi/maevsi/commit/08b7793706d654a0dc631dfb9830913c68d28906)), closes [#257](https://github.com/maevsi/maevsi/issues/257)
* **legal-notice:** translate raw text ([0d24d43](https://github.com/maevsi/maevsi/commit/0d24d433fabd7f3531fcfbe8dfb1d81ee4736295))
* **node:** lint all before push ([441770b](https://github.com/maevsi/maevsi/commit/441770bcce38d1526464169104757c10514399f2))
* x ([894ba38](https://github.com/maevsi/maevsi/commit/894ba3844c2157d9d3ea316fcb7d932c3f0e34a0))
* **open-graph:** scale down logo ([525334e](https://github.com/maevsi/maevsi/commit/525334e74b737e10113abed7f40dfcfe387d9047))
* translate raw text ([dd80b83](https://github.com/maevsi/maevsi/commit/dd80b834a029d877f2bb2922dafa1c51f06c4581)), closes [#304](https://github.com/maevsi/maevsi/issues/304)

# [0.72.0](https://github.com/maevsi/maevsi/compare/0.71.1...0.72.0) (2021-06-15)


### Bug Fixes

* **event:** resolve form issues ([264044d](https://github.com/maevsi/maevsi/commit/264044d7acbd07650bda73f01fb7938d71e49c68)), closes [#255](https://github.com/maevsi/maevsi/issues/255)
* **footer:** correct product links ([238dfbf](https://github.com/maevsi/maevsi/commit/238dfbf39fd5c01605afc9529fd8354f8f158a64))
* **open-graph:** use image with recommended size and title ([c1de158](https://github.com/maevsi/maevsi/commit/c1de15816e43b2cf1fc66cba25c07dec4dfb9b98))


### Features

* **event:** add url field ([c7194dd](https://github.com/maevsi/maevsi/commit/c7194dd72f849a8b1d0739ea61b961ecdf52c953)), closes [#256](https://github.com/maevsi/maevsi/issues/256)
* **sqitch:** make pattern checks case sensitive ([133a1ad](https://github.com/maevsi/maevsi/commit/133a1adb2801121f1aee5eea4ae1f1df52a74463))

## [0.71.1](https://github.com/maevsi/maevsi/compare/0.71.0...0.71.1) (2021-06-14)


### Bug Fixes

* **icons:** remove module opacity ([df9a651](https://github.com/maevsi/maevsi/commit/df9a6510d92f8ae9218b7de55be4d12861f3587b))
* **open-graph:** use supported image format ([c87a84b](https://github.com/maevsi/maevsi/commit/c87a84bf348e81e9926eab8ee7640f2f469d89d2))
* **step:** correct number input type ([a7be694](https://github.com/maevsi/maevsi/commit/a7be694156ac98c4bffb94cc4be20a2dd1a60e0a))

# [0.71.0](https://github.com/maevsi/maevsi/compare/0.70.1...0.71.0) (2021-06-11)


### Features

* **i18n:** add linting for translations ([630f94d](https://github.com/maevsi/maevsi/commit/630f94d799030e77fe503cec85763b8206b57633))
* **index:** improve responsiveness of text ([6d5996e](https://github.com/maevsi/maevsi/commit/6d5996eb063d38ec870742f62c19722acdc8d597)), closes [#103](https://github.com/maevsi/maevsi/issues/103)

## [0.70.1](https://github.com/maevsi/maevsi/compare/0.70.0...0.70.1) (2021-06-10)


### Bug Fixes

* **index:** correct typo ([ea35c56](https://github.com/maevsi/maevsi/commit/ea35c56d91bf09cc7498b50e4180a1f6da4c0bfb))
* **index:** improve smartphone section's responsiveness ([f77979c](https://github.com/maevsi/maevsi/commit/f77979c9df731f56b8829c39916b6ed063ecb3f9))

# [0.70.0](https://github.com/maevsi/maevsi/compare/0.69.0...0.70.0) (2021-06-10)


### Features

* **footer:** improve responsiveness ([0dfbf07](https://github.com/maevsi/maevsi/commit/0dfbf0789cc4955fac44bbb2f0e5627520dada8a))
* **hero:** tighten image ([c8af06f](https://github.com/maevsi/maevsi/commit/c8af06fa8bd7731cde935065efca685698cd6e65))
* **index:** add benefits ([7a71236](https://github.com/maevsi/maevsi/commit/7a71236aca547bac7286eb8f10efb88e443df469))
* **index:** add smartphone section ([eebcdfd](https://github.com/maevsi/maevsi/commit/eebcdfd71d24dac7c9d24aee40077d371c7e2bda))
* **index:** add steps ([b13e202](https://github.com/maevsi/maevsi/commit/b13e2027bd2460ca1b0bc48d0f7b71955d7fbfff))
* **index:** improve responsiveness ([d90ecb0](https://github.com/maevsi/maevsi/commit/d90ecb0bb725680fdf88d8e172f6ca0dea0c0612))
* **index:** reorder sections ([dd2ef68](https://github.com/maevsi/maevsi/commit/dd2ef686dab7105c2bd7877c1c668b7b40705f7b))

# [0.69.0](https://github.com/maevsi/maevsi/compare/0.68.0...0.69.0) (2021-06-09)


### Bug Fixes

* **button-icon:** add missing aria label ([aa4d6aa](https://github.com/maevsi/maevsi/commit/aa4d6aafd730165f7b515ee80fde73dff3891fb4))
* **creevey:** update images ([9bc7ea2](https://github.com/maevsi/maevsi/commit/9bc7ea2c12cf96b6a39208b3802c9496b58f5d24))
* **footer:** improve responsiveness ([00b09fe](https://github.com/maevsi/maevsi/commit/00b09feb52ccfa3dfb87cf781cfdddf32bc2d430))
* **menu:** correct hide click listener ([5d905f4](https://github.com/maevsi/maevsi/commit/5d905f4249beb1cb2c7efae08c168597a724f45a))


### Features

* **fonts:** switch to manrope font ([783f58b](https://github.com/maevsi/maevsi/commit/783f58bea2d4e88c6d4b4942cae08563afeae09d))
* **footer:** add categories ([6a43d95](https://github.com/maevsi/maevsi/commit/6a43d95be6f38591d7643be113009e76e82f5431))
* **footer:** add footer category ([f69ee0a](https://github.com/maevsi/maevsi/commit/f69ee0a0048e81bb7bf2dacc7d7f908809e5dd5c))
* **footer:** improve design ([db0c2f4](https://github.com/maevsi/maevsi/commit/db0c2f4d2b045b9e26b9b59c10710b2089748014))
* **header:** center logo ([3979995](https://github.com/maevsi/maevsi/commit/3979995d4c0ee9fcef935c79e7f68bff3a4e050f))
* **index:** implement hero design ([733092c](https://github.com/maevsi/maevsi/commit/733092ce9541ba1895939be841ca3c62c37fc47d))
* **menu:** separate dev and dashboard ([57ac0d9](https://github.com/maevsi/maevsi/commit/57ac0d974e60570f90978ccc63ea2041a4e4bbcf))
* **node:** use colon in script names ([3b7fb10](https://github.com/maevsi/maevsi/commit/3b7fb10060d8497c855909f40b2584c26b57ded4))

# [0.68.0](https://github.com/maevsi/maevsi/compare/0.67.0...0.68.0) (2021-06-07)


### Bug Fixes

* **creevey:** update images ([6ca63ca](https://github.com/maevsi/maevsi/commit/6ca63ca5b1ad3267c94d962be57b5eb31c56fd79))


### Features

* **img-bot:** ignore creevey images ([d6e14f3](https://github.com/maevsi/maevsi/commit/d6e14f301c9b3851e3a706dce2415b53588b85e5))
* **node:** always restart selenium container ([c4063b2](https://github.com/maevsi/maevsi/commit/c4063b2562d25dac45a80ded51577549730b319f))
* **storybook:** add more stories ([a421af6](https://github.com/maevsi/maevsi/commit/a421af6ae91c6ea52e17a3adbcc347c58fd9c2ee))


### Reverts

* Revert "feat(tailwind): set montserrat as default font" ([77299b6](https://github.com/maevsi/maevsi/commit/77299b6d96b0e3f7e5a3b14c46cb855c6bccb367))

# [0.67.0](https://github.com/maevsi/maevsi/compare/0.66.1...0.67.0) (2021-06-06)


### Bug Fixes

* **creevey:** update images ([719f3db](https://github.com/maevsi/maevsi/commit/719f3db649edd9c9195c2f737f87606f59960215))


### Features

* **storybook:** start on port 6006 ([409c95c](https://github.com/maevsi/maevsi/commit/409c95cb76725024171a994732c8263aa2b033b4))
* **tailwind:** set montserrat as default font ([58abe50](https://github.com/maevsi/maevsi/commit/58abe50216965e05f580f20227f7853043848421))

## [0.66.1](https://github.com/maevsi/maevsi/compare/0.66.0...0.66.1) (2021-06-05)


### Bug Fixes

* **ci:** do not remove selenium after test ([80def0c](https://github.com/maevsi/maevsi/commit/80def0cc8f959f8d6b24c4e774c8d10b5ff06c2c))
* **ci:** readd selenium starter ([4d1a518](https://github.com/maevsi/maevsi/commit/4d1a5180b1f1f84e39c2dad4eae5b534a3bbbee4))
* **ci:** start selenium on release ([11dbb57](https://github.com/maevsi/maevsi/commit/11dbb5729063da5b9c6824e6cf02bdfd3cbe2882))
* **ci:** use artifacts instead of double build ([0904d84](https://github.com/maevsi/maevsi/commit/0904d8458dffe604a9368e4c714f32c36ac36b27))
* **ci:** use zip as artifact ([a33b169](https://github.com/maevsi/maevsi/commit/a33b16937324d30d3d9db43624958295e5d3ed6e))

# [0.66.0](https://github.com/maevsi/maevsi/compare/0.65.0...0.66.0) (2021-06-05)


### Features

* **creevey:** get rid of selenium environment variable ([6acb2e7](https://github.com/maevsi/maevsi/commit/6acb2e75eae192243dacb3b8a4aea9a58c8fc425))
* **storybook:** add app-link stories ([38fd3ed](https://github.com/maevsi/maevsi/commit/38fd3edac35c1813d22823e1230be7980bd9aae5))

# [0.65.0](https://github.com/maevsi/maevsi/compare/0.64.3...0.65.0) (2021-06-04)


### Bug Fixes

* **selenium:** add docker host networking ([157e30b](https://github.com/maevsi/maevsi/commit/157e30bb561967ffdc03f6e823ece25bc9dc0565))


### Features

* **report:** add .gitkeep ([51213e0](https://github.com/maevsi/maevsi/commit/51213e0b185b36f97fd12dad23f040062bb44056))
* **storybook:** add a11y addon ([91c277e](https://github.com/maevsi/maevsi/commit/91c277ed09172a039444e249bd70af5bd33356c8))
* **storybook:** add storybook and creevey ([727eade](https://github.com/maevsi/maevsi/commit/727eadef9b3ec906eb09b651148ddc203042d769))

## [0.64.3](https://github.com/maevsi/maevsi/compare/0.64.2...0.64.3) (2021-05-31)


### Bug Fixes

* **release:** schedule release ([3a785aa](https://github.com/maevsi/maevsi/commit/3a785aa566f1159f7059a1671e5bbd8e90a5afd7))

## [0.64.2](https://github.com/maevsi/maevsi/compare/0.64.1...0.64.2) (2021-05-17)


### Bug Fixes

* **release:** schedule release ([341cd37](https://github.com/maevsi/maevsi/commit/341cd3794e396999f176ab43d67b700b12238165))

## [0.64.1](https://github.com/maevsi/maevsi/compare/0.64.0...0.64.1) (2021-05-08)


### Bug Fixes

* **tailwind:** use integrated jit ([64d68b0](https://github.com/maevsi/maevsi/commit/64d68b03a055f81df59b63c905293ee47e2235b3))

# [0.64.0](https://github.com/maevsi/maevsi/compare/0.63.2...0.64.0) (2021-05-05)


### Bug Fixes

* **ical:** properly handle environment variables in test ([b2012cb](https://github.com/maevsi/maevsi/commit/b2012cbdd50c5ee022755b2574fda267a56abafc))


### Features

* **ical:** migrate to ical-generator v2 ([018132c](https://github.com/maevsi/maevsi/commit/018132c8beeadcccecc33ac77c10eaf4a7c30661))

## [0.63.2](https://github.com/maevsi/maevsi/compare/0.63.1...0.63.2) (2021-05-03)


### Bug Fixes

* **release:** schedule release ([96b090b](https://github.com/maevsi/maevsi/commit/96b090be27d8119de67b392a5a44b76e6dd5f654))

## [0.63.1](https://github.com/maevsi/maevsi/compare/0.63.0...0.63.1) (2021-04-19)


### Bug Fixes

* **release:** schedule release ([1fee38d](https://github.com/maevsi/maevsi/commit/1fee38d0915aecb807a51e3e15176b740f125642))

# [0.63.0](https://github.com/maevsi/maevsi/compare/0.62.3...0.63.0) (2021-04-06)


### Features

* **nuxt:** enable jit compilation ([4db69f6](https://github.com/maevsi/maevsi/commit/4db69f69cc27bb94304e71ac1374b70b2498d1ba))
* **tailwind:** disable jit compilation ([86e298f](https://github.com/maevsi/maevsi/commit/86e298fbd8020d6f6df5ee04821f2fe493ffe830))
* **tailwind:** enable jit compilation ([991bd5a](https://github.com/maevsi/maevsi/commit/991bd5a929b6e3ac513d964b1960cd69154a56f4))

## [0.62.3](https://github.com/maevsi/maevsi/compare/0.62.2...0.62.3) (2021-04-01)


### Bug Fixes

* nuxt/package.json & nuxt/yarn.lock to reduce vulnerabilities ([8cd0e73](https://github.com/maevsi/maevsi/commit/8cd0e733d2e58b7e5fd13684abbebff110921548))

## [0.62.2](https://github.com/maevsi/maevsi/compare/0.62.1...0.62.2) (2021-03-25)


### Bug Fixes

* nuxt/package.json & nuxt/yarn.lock to reduce vulnerabilities ([bfa293a](https://github.com/maevsi/maevsi/commit/bfa293a4c02f4f3a2750ab476a61340e26cad568))

## [0.62.1](https://github.com/maevsi/maevsi/compare/0.62.0...0.62.1) (2021-03-22)


### Bug Fixes

* **release:** schedule release ([c2181ca](https://github.com/maevsi/maevsi/commit/c2181ca985e391f0235be892dad94071d0e378df))

# [0.62.0](https://github.com/maevsi/maevsi/compare/0.61.0...0.62.0) (2021-03-13)


### Features

* **graphql:** improve error message display ([54a4f74](https://github.com/maevsi/maevsi/commit/54a4f74767e2ae8f157a339dda6ff27224772bf5))
* **sign-in:** allow to resend verification mail ([4407f70](https://github.com/maevsi/maevsi/commit/4407f7074d1ae4b9fcc86b527bb8f3597a4c554f)), closes [#128](https://github.com/maevsi/maevsi/issues/128)

# [0.61.0](https://github.com/maevsi/maevsi/compare/0.60.0...0.61.0) (2021-03-13)


### Bug Fixes

* **form:** allow autocompletion data to be saved ([3231745](https://github.com/maevsi/maevsi/commit/3231745cc94938dd45d2cd1a29053daac6217087)), closes [#253](https://github.com/maevsi/maevsi/issues/253)


### Features

* **event-invitations:** move invitee count to add button ([dc4b233](https://github.com/maevsi/maevsi/commit/dc4b233ed968f9834a4de096deb5449d4a2faf03))

# [0.60.0](https://github.com/maevsi/maevsi/compare/0.59.0...0.60.0) (2021-03-13)


### Features

* **account:** allow to redirect to referrer on sign in ([dc32860](https://github.com/maevsi/maevsi/commit/dc32860a74334a44a0fd72df1ccdeabefc8c0efd)), closes [#199](https://github.com/maevsi/maevsi/issues/199) [#249](https://github.com/maevsi/maevsi/issues/249)
* **error:** improve error 403 information ([fe1fc2e](https://github.com/maevsi/maevsi/commit/fe1fc2e1ad23a1a97048e453dd94d0988bbdd2d5))
* **nuxt:** enable devtools ([ac08b6b](https://github.com/maevsi/maevsi/commit/ac08b6b397b5ed229de4c52ea216d87df7a806a5))

# [0.59.0](https://github.com/maevsi/maevsi/compare/0.58.0...0.59.0) (2021-03-13)


### Features

* **form:** rework validation ([510a3c2](https://github.com/maevsi/maevsi/commit/510a3c2bbc88aebfa415ee6258eb62679c51be3a))
* **from-input-error:** add exclamation mark ([89ca64f](https://github.com/maevsi/maevsi/commit/89ca64f911b3d7c1ff6f8336619c9eb06f6456d3))

# [0.58.0](https://github.com/maevsi/maevsi/compare/0.57.1...0.58.0) (2021-03-12)


### Bug Fixes

* **form-checkbox:** correct checked property ([4e45165](https://github.com/maevsi/maevsi/commit/4e45165c4a25ccb75ed3bf587e770a62dca60e1a))
* **tailwind:** safelist disabled and placeholder ([dcdd636](https://github.com/maevsi/maevsi/commit/dcdd636dfa226bdae41560249c6174ae29837c0f))


### Features

* **app-link:** use inline-flex ([cd2b7e9](https://github.com/maevsi/maevsi/commit/cd2b7e9dc4c8d7f3b4559c0ca5416e37bf838935))
* **event-invitations:** make table auto scrollable ([605b430](https://github.com/maevsi/maevsi/commit/605b430d8b247d1ce797e1dbd05b93e5ef42dd1c))
* **event-list:** always show event creation button ([7b9cf5c](https://github.com/maevsi/maevsi/commit/7b9cf5c65dd2536de95fa9a840a0476ea9f9d6e8))
* **form-event:** add markdown description information ([eebdc93](https://github.com/maevsi/maevsi/commit/eebdc93896a8aa8074890fe25e72cb2fb0ae0183))
* **form-event:** hide slug ([0b5fe43](https://github.com/maevsi/maevsi/commit/0b5fe437e3227a73b4a57c295a753f1434e391f8))
* **i18n:** rename remote to digital ([9e71b5c](https://github.com/maevsi/maevsi/commit/9e71b5c2dcf1afcd4cce3e801806b77e2d41fcc0))
* improve text truncation ([53fe081](https://github.com/maevsi/maevsi/commit/53fe081772181139addb303bbc93b8b10adb831b))

## [0.57.1](https://github.com/maevsi/maevsi/compare/0.57.0...0.57.1) (2021-03-12)


### Bug Fixes

* fix linter issues ([5cf04f0](https://github.com/maevsi/maevsi/commit/5cf04f05dc87d57b86233e604b4e7aa2d4685f36))

# [0.57.0](https://github.com/maevsi/maevsi/compare/0.56.0...0.57.0) (2021-03-11)


### Features

* **event-invitations:** add feedback title ([b42bde0](https://github.com/maevsi/maevsi/commit/b42bde0dd52f832e81d98ec345d7224decaf5e11))
* **form-event:** improve event update ux ([15ab91a](https://github.com/maevsi/maevsi/commit/15ab91a9d921c91a5c0540e065d537f284e96a64))
* **form-event-invitation:** remove confirmation modals ([68436af](https://github.com/maevsi/maevsi/commit/68436af9c3e293746c625989a74964fc306eebd9))
* **invitation:** support html emails ([1c2eeda](https://github.com/maevsi/maevsi/commit/1c2eeda989a6219c4ca134de5b52f4b4fdb0ba5b))

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
