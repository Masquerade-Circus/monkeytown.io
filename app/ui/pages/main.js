import {displayName, version, description} from '../../../package.json';

let Main = {
    title: displayName,
    version: version,
    description: description,
    id: (0 | Math.random() * 6.04e7).toString(36), // change this to version when publish
    view(...children) {
        let view = <html lang="en">
            <head>
                <title>{Main.title}</title>
                <meta charset="utf-8"/>
                <meta name="description" content={Main.description}/>
                <meta http-equiv="x-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, minimal-ui"/>
                <link href="/css/main.css" rel="stylesheet"/>
                <link rel="shortcut icon" href="/imgs/favicon.ico"/>
            </head>
            <body>
                {children}
                <script src={`/js/index.min.js?v=${Main.id}`}></script>
            </body>
        </html>;

        return view;
    }
};

export default Main;
