import { NgModule, ModuleWithProviders } from '@angular/core';

import { SumService } from '../services/sum-service';

@NgModule({
    declarations: [
        // Pipes.
        // Directives.
    ],
    exports: [
        // Pipes.
        // Directives.
    ]
})
export class ArithmeticModule {

    /**
     * Use in AppModule: new instance of SumService.
     */
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: ArithmeticModule,
            providers: [SumService]
        };
    }

    /**
     * Use in features modules with lazy loading: new instance of SumService.
     */
    public static forChild(): ModuleWithProviders {
        return {
            ngModule: ArithmeticModule,
            providers: [SumService]
        };
    }

}
