// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
    export interface theme {
        // borderRadius: string;

        colors: {
            pink: string,
            blue: string,
            yellow: string,
            red: string,
            green: string,
            grey: string,
            black: string,
            white: string
        },
        fontSize: {
            small: string,
            normal: string,
            medium: string,
            big: string,
            h1: string
        },
        mediaQueries: {

        }
    }
}