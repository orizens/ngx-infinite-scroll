import { Injectable } from '@angular/core';

@Injectable()
export class SumService {

    /**
     * Stores the last sum.
     */
    public sum: number;

    /**
     * Calculates the sum.
     * @param addends Numbers to be added
     */
    public calculate(...addends: number[]): void {
        this.sum = 0;
        for (let addend of addends) {
            this.sum += addend;
        }
    }

}
