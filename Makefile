SUBDIRS = JsTypeHax_payload CustomRPXLoader

.PHONY: clean $(SUBDIRS)

all: $(SUBDIRS)

$(SUBDIRS):
	$(MAKE) clean -C $@
	$(MAKE) -C $@

clean:
	$(MAKE) clean -f /JsTypeHax_payload/Makefile
	$(MAKE) clean -f /CustomRPXLoader/Makefile