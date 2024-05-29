#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
    // Accept a single command-line argument

    if (argc != 2)
    {
        printf("Usage: ./recover FILE\n");
        return 1;
    }

    // Open the memory card

    char *file = argv[1];
    FILE *card = fopen(file, "r");

    if (card == NULL)
    {
        printf("Could not open %s.\n", file);
        return 2;
    }

    bool found_jpg = false;

    int jpg_count = 0;

    uint8_t buffer[512]; // Create a buffer for a block of data

    char jpg_name[8];

    FILE *outptr = NULL;

    // While there´s still data left to read from the memory card

    while (fread(buffer, 1, 512, card) == 512)
    {
        if (buffer[0] == 0xff && buffer[1] == 0xd8 && buffer[2] == 0xff && (buffer[3] & 0xf0) == 0xe0)
        {
            if (found_jpg)
            {
                fclose(outptr);
            }
            else
            {
                found_jpg = true;
            }

            sprintf(jpg_name, "%03d.jpg", jpg_count);
            outptr = fopen(jpg_name, "w");

            if (outptr == NULL)
            {
                fclose(card);
                printf("Could not create %s.\n", jpg_name);
                return 3;
            }

            jpg_count++;
        }

        if (found_jpg)
        {
            fwrite(buffer, 1, 512, outptr);
        }
    }

    fclose(card);

    if (found_jpg)
    {
        fclose(outptr);
    }

    return 0;
}
