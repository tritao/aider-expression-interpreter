CC = gcc
CFLAGS = -Wall -Wextra -O2 -g
TARGET = bytecode_runner
SRCS = main.c bytecode_interpreter.c
OBJS = $(SRCS:.c=.o)

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CC) $(CFLAGS) -o $@ $^

%.o: %.c
	$(CC) $(CFLAGS) -c $<

clean:
	rm -f $(OBJS) $(TARGET)

.PHONY: all clean
