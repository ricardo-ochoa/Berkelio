import axios from "axios";
import Papa from "papaparse";

import { Product } from "./types";

export default {
    list: async(): Promise<Product[]> => {
        return axios
        .get(`https://docs.google.com/spreadsheets/d/e/2PACX-1vQLG0EEiJ8Ef08h7jbFTFf997qPRt0qFgORLm4NGdIu9qCNyJ4Wdq-AhePbae-frQcH_ABWfqDHH5I9/pub?output=csv`,
                {
                    responseType: 'blob',
                },
            )
            .then(
                (response) =>
                new Promise<Product[]>((resolve, reject) => {
                    Papa.parse(response.data,{
                        header: true,
                        complete: (results) => {
                            const products = results.data as Product[];

                            return resolve(
                                products.map((product) => ({
                                    ...product,
                                    price: Number(product.price),
                                })),
                            );
                        }
                    });
                }),
            );
    },
};