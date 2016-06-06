GCC   := go 
FLAGS := build

STATIC  := ./static
TPL     := ./templates
DIST    := ../../distribution.zip
BINARY  := ../../bin/ftjx.exe


dist : $(DIST)
	echo Make distribution ...

$(BINARY): main.go
	$(GCC) $(FLAGS) $<


$(DIST) : $(STATIC) $(TPL) $(BINARY)
	rm -rf $(DIST)
	printf "%s\n" $(BINARY) $(STATIC) $(TPL) | xargs zip -r -q $@


clean: 

	rm -rf $(BINARY) $(DIST)

