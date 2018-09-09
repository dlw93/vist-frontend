import { trigger, transition, style, animate, group } from "@angular/animations";

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
