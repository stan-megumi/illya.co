CC = gcc -g -O2
FLAG =  -Wno-implicit-function-declaration #-Wno-write-strings -Wno-return-local-addr 
INC = -Iinclude 
LOAD = -Llib
LINK = -lsodium -llept -ltesseract -ltensorflow

TARGET = megumi
LIB_DIR = lib
SRC_DIR = src
OBJ_DIR = obj
CTYPE = c
CPPTYPE = cpp

DEF_FILES = include/def.h
SRC_FILES = $(shell find $(SRC_DIR) -name "*.$(CTYPE)")
OBJ_FILES = $(patsubst $(SRC_DIR)/%.$(CTYPE),$(OBJ_DIR)/%.o,$(SRC_FILES))

default: $(OBJ_FILES)
	$(CC)  $(FLAG)  $(LOAD) $^  -o $(TARGET)  $(LINK)
	make face

$(OBJ_DIR)/%.o:  $(SRC_DIR)/%.$(CTYPE) $(DEF_FILES)
	mkdir -p $(dir $@)
	$(CC) $(FLAG) $(INC) -c -o $@  $(filter-out $(DEF_FILES), $^)

run:
	LD_LIBRARY_PATH=$(LIB_DIR)  TESSDATA_PREFIX=./test ./$(TARGET) 

run0:
	LD_LIBRARY_PATH=$(LIB_DIR)  TESSDATA_PREFIX=./test ./$(TARGET) 0	
run1:
	./c++/build/face_art ./c++/test/shape_predictor_68_face_landmarks.dat ../testNuxt/test/static/tmp1 ../testNuxt/test/static/tmp1After 

clean:
	rm -f $(OBJ_FILES)
	rm -f $(TARGET)

refresh:
	make clean && make

clear:
	rm -f $(addsuffix *~, $(dir $(SRC_FILES)))

# git remote add origin https://github.com/c0ldlimit/vimcolors.git
# git remote add origin git@git.coding.net:illya/Tdf.git

push:
	git add .
	git commit -a -m "automatic push"
	git push -u origin master
pull:
	git fetch
	git checkout
	git pull
rstatus:
	git remote show origin
clearprojectile:
	rm -rf ~/.emacs.d/projectile-bookmarks.eld
#        (setq projectile-project-root-files #'(".projectile"))	
face:
	cd c++ && make

runface:
	./c++/build/face_art ./c++/test/shape_predictor_68_face_landmarks.dat ./c++/test/faces/tmp1
