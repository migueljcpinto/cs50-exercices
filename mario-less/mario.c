#include <cs50.h>
#include <stdio.h>

int main(void)
{
    // Declare int variable Height
    int height;
    do
    {
        height = get_int("Height: ");
    }

    // Height should not be less than 1 or greater than 8

    while (height < 1 || height > 8);

    // printing new lines
    for (int row = 0; row < height; row++)
    {
        // printing spaces
        for (int space = height - row - 1; space > 0; space--)
        {
            printf(" ");
        }
        // printing hashes(#)
        for (int hash = 0; hash < row + 1; hash++)
        {
            printf("#");
        }
        printf("\n");
    }
}