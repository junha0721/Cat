import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

// getServerSidePropsから渡されるpropsの型
type Props = {
    initialImageUrl: string;
};

// ページ
const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
    const [imageUrl, setImageUrl] = useState(initialImageUrl); //初期値を渡す
    const [loading, setLoading] = useState(false); //初期状態はfalseにしておく

    //useEffect(() => {
    //    fetchImage().then((newImage) => {
    //       setImageUrl(newImage.url);
    //        setLoading(false);
    //    });
    //}, []);
    //ボタンをクリックしたときに画像を読み込む処理
    const handleClick = async () => {
        setLoading(true); //読込中フラグを立てる
        const newImage = await fetchImage();
        setImageUrl(newImage.url); // 画像URLの状態を更新する
        setLoading(false); //読込中フラグを倒す
    }
     
    return (
        <div>
            <button onClick={handleClick}
                style={{
                    backgroundColor: '#319795',
                    border: "none",
                    borderRadius: "4px",
                    color: "white",
                    padding: "4px 8px",
            }}
            >
                きょうにゃんこ🐈
            </button>    
            <div style={{ marginTop: 8, maxWidth: 500 }}>
                <img src="{catImageUrl}" width="100%" height="auto" alt="猫" />

            </div>
     </div> 
    );
    
};

export default IndexPage;

//　サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();
    return {
        props: {
            initialImageUrl: image.url,
        },
    };
};

type Image = {
    url: string;
};

const fetchImage = async (): Promise<Image> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const images = await res.json();
    console.log(images);
    return images[0];
};

fetchImage();