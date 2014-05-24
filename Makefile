TESTS = test/spec
MOCHA = ./node_modules/mocha/bin/_mocha
MOCHA_PHANTOM = ./node_modules/mocha-phantomjs/bin/mocha-phantomjs
BROWSERIFY = ./node_modules/browserify/bin/cmd.js

test: compile test-mocha

compile:
	$(BROWSERIFY) test/spec/test.js -o test/fixtures/compiled.js

test-mocha:
	$(MOCHA_PHANTOM) -p ./node_modules/phantomjs/bin/phantomjs ./test/fixtures/index.html