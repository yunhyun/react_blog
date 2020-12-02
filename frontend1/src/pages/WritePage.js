import React from 'react';
// import Editor from '../components/write/Editor';
// import TagBox from '../components/write/TagBox';
// import WriteActionButtons from '../components/write/WriteActionButtons';
import Reponsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import { Helmet } from 'react-helmet-async';

const WritePage = () => {
    return (
        <Reponsive>
            <Helmet>
                <title>새글 작성하기</title>
            </Helmet>
            <EditorContainer />
            <TagBoxContainer />
            <WriteActionButtonsContainer />
        </Reponsive>
    );
};

export default WritePage;