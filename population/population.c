#include <cs50.h>
#include <stdio.h>

int main(void)
{
    // TODO: Prompt for start size

    int start;
    do
    {
        start = get_int("Start size: ");
    }
    while (start < 9);

    // TODO: Prompt for end size

    int end;
    do
    {
        end = get_int("End size: ");
    }
    while (start > end);

    // TODO: Calculate number of years until we reach threshold

    int years = 0;
    do
    {
        start = start + (start / 3) - (start / 4);
        years++;
    }
    while (start < end);

    printf("Years: %i\n", years);
}
