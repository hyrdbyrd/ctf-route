#include <stdio.h>
#include <conio.h>

#define LEN 21
// Code_reverse_is_easy\0

int main() {
    int isReversed = 1;
    if (isReversed) {
        printf("Ahaha! U'r cant find de flag!");
    } else {
        char flag[LEN] = {
            'C', 'o', 'd', 'e', '_', 
            'r', 'e', 'v', 'e', 'r', 's', 'e', '_',
            'i', 's', '_',
            'e', 'a', 's', 'y', '\0'
        };
        printf("%s", flag);
    }

    return 0;
}