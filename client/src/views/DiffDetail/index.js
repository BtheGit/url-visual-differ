import React from 'react';
import { connect } from 'react-redux';
import base64js from 'base64-js';
import './index.css';

const generateImgSrc = bufferArray => {
    const base64Pre = 'data:image/png;base64,';
    const imgData = base64js.fromByteArray(bufferArray);
    const imgSrc = `${base64Pre}${imgData}`;
    return imgSrc;
}

const DiffDetail = ({ match, results }) => {
    const width = match.params.id;
    let detailInfo;
    if(results) {
        detailInfo = results.find(el => el.width.toString() === width.toString());
    }
    const renderError = () => <div className="diff-detail__error">Details Not Found. Please try a new search</div>;
    const renderSettings = ({
        pathPartial,
        tolerance
    }, width) => {
        return (
            <div className="diff-detail__settings">
                <h1>Path</h1>
                <p>{pathPartial}</p>
                <h1>Size</h1>
                <p>{width}{ Number(width) === Number(width) ? 'px' : null }</p>
                <h1>Tolerance</h1>
                <p>{tolerance}</p>
            </div>
        )
    }
    
    const renderDetails = ({
            img1,
            img2,
            result,
            settings
        }) => {
        const {
            basisRoot,
            comparisonRoot
        } = settings;
        return (
            <div className="diff-detail__inner">
                <div className="diff-detail__img">
                    <div className="diff-detail__img-header">
                        <h3>{basisRoot}</h3>
                    </div>
                    {img1 && <img src={generateImgSrc(img1.data)} alt="Base" />}
                </div>
                <div className="diff-detail__img">
                    <div className="diff-detail__img-header">
                        <h3>{comparisonRoot}</h3>
                    </div>
                    {img2 && <img src={generateImgSrc(img2.data)} alt="Comparison" />}
                </div>
                <div className="diff-detail__img">
                    <div className="diff-detail__img-header">
                        <h3>Diff</h3>
                    </div>
                    {result && <img src={generateImgSrc(result.data)} alt="Diff Result" />}
                </div>
            </div>
        );
    }

    return (
        <div className="diff-detail">
            { !detailInfo ? null : renderSettings(detailInfo.settings, detailInfo.width) }
            { !detailInfo ? renderError() : renderDetails(detailInfo) }
        </div>
    )
}

const MapStateToProps = store => ({
    results: store.diff.results
})

export default connect(MapStateToProps)(DiffDetail);