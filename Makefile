.PHONY: clean build

all: clean build

build:
	$(MAKE) -C JsTypeHax_payload
	$(MAKE) -C CustomRPXLoader
	rm -r -f docs
	mkdir docs -p
	cd JsTypeHax && php index.php > ./../docs/index.html
	cd JsTypeHax && php exploit.php > ./../docs/exploit.html
	cd JsTypeHax && php 404.php > ./../docs/404.html
	cp ./JsTypeHax/index.css ./docs/index.css
	cp ./JsTypeHax/index.js ./docs/index.js
	cp ./JsTypeHax/dumpling-logo.png ./docs/dumpling-logo.png
	cp ./JsTypeHax/payload.elf ./docs/payload.elf

clean:
	$(MAKE) -C JsTypeHax_payload clean
	$(MAKE) -C CustomRPXLoader clean