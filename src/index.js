import React, { useState } from "react";
import { render } from "react-dom";

const App = () => {
    const [pics, setPics] = useState([""]);

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        e.target.reset();
        setPics([""]);

        console.log(
            "send things to server, asynchronously, because it's the future"
        );
    };

    const handleChange = async (e) => {
        e.preventDefault();

        const files = e.currentTarget.files;
        const out = [];

        for (let index = 0; index < files.length; index++) {
            out.push(await toBase64(files.item(index)));
        }

        setPics(out);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    name="files"
                    multiple
                    onChange={handleChange}
                />
                <button type="submit">Ok</button>
            </form>
            {!!pics[0] && pics.map((p, i) => <img key={i} src={p} alt="" />)}
        </>
    );
};

render(<App></App>, document.querySelector("main"));
