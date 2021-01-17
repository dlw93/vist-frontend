import { trigger, transition, style, animate, group, state } from "@angular/animations";

export const VIST_EXPAND_ANIMATION = trigger('vistExpand', [
    transition(':enter', [
        style({ height: 0 }),
        animate('450ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ height: '*' }))
    ]),
    transition(':leave', [
        style({ height: '*' }),
        animate('450ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ height: 0 }))
    ])
]);

export const VIST_SLIDE_IN_ANIMATION = trigger('vistSlideIn', [
    transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        group([
            animate('0.5s ease-in', style({ opacity: 1 })),
            animate('0.5s ease-out', style({ transform: 'translateY(0)' }))
        ])
    ])
]);

export const VIST_SOFT_IN_OUT_ANIMATION = trigger('vistSoft', [
    state('void', style({
        opacity: 0.5,
        transform: 'scale(0.95)'
    })),
    transition(':enter',
        animate('140ms cubic-bezier(0, 0, 0.2, 1)', style({ transform: 'scale(1)', opacity: 1 }))
    ),
    transition(':leave',
        animate('100ms 25ms linear', style({ opacity: 0 }))
    )
]);
