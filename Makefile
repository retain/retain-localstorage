TESTS = test/spec
REPORTER = spec
MOCHA = ./node_modules/mocha/bin/_mocha
ISTANBUL = ./node_modules/istanbul/lib/cli.js
MOCHA_PHANTOM = ./node_modules/mocha-phantomjs/bin/mocha-phantomjs
BROWSERIFY = ./node_modules/browserify/bin/cmd.js

server:
	node test/fixtures/server.js --server

test: compile test-mocha

compile:
	$(BROWSERIFY) test/spec/test.js -o test/compiled.js

test-mocha:
	$(MOCHA_PHANTOM) -p ./node_modules/phantomjs/bin/phantomjs ./test/index.html

test-cov: compile istanbul

istanbul:
	$(MOCHA_PHANTOM) -p ./node_modules/phantomjs/bin/phantomjs ./test/index.html

coveralls:
	cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

clean:
	rm -rf ./coverage