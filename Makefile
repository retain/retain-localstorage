TESTS = test/spec
REPORTER = spec
MOCHA = ./node_modules/mocha/bin/mocha
ISTANBUL = ./node_modules/istanbul/lib/cli.js
MOCHA_PHANTOM = ./node_modules/mocha-phantomjs/bin/mocha-phantomjs

server:
	node test/fixtures/server.js --server

test: test-mocha

test-mocha:
	$(MOCHA_PHANTOM) -p ./node_modules/phantomjs/bin/phantomjs ./test/index.html

test-cov: istanbul

istanbul:
	$(ISTANBUL) cover $(MOCHA_PHANTOM) -R ./test/index.html -p ./node_modules/phantomjs/bin/phantomjs

coveralls:
	cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

clean:
	rm -rf ./coverage