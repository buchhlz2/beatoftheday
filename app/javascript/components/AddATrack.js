import React from "react";
import styled from "styled-components";
import $ from "jquery";
import _ from "lodash";

const Upload = styled.button``

class AddATrack extends React.Component {
  constructor(props) {
    super(props);

    this.state = { selectedFile: false };
  }

  fileChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  }

  onClickUpload = () => {
    this.upload(this.state.selectedFile)
  }

  upload = (blob) => {
    this.setState({ uploading: true });

    const requestObj = {
      method: 'GET',
      url: '/tracks/s3_direct_post',
    };

    $.ajax(requestObj).then(data => {
      console.log(data);
      let fd = new FormData();
      _.each(data.fields, (value, key) => {
        fd.append(key, value);
      });

      fd.append("file", blob);

      const requestObj2 = {
        method: 'POST',
        url: data.url,
        data: fd,
        processData: false,
        contentType: false
      };

      $.ajax(requestObj2).then(data2 => {
        const data2$ = $(data2);
        const location = data2$.find('PostResponse').find('Location').text()

        const requestObj3 = {
          method: 'POST',
          url: '/tracks/s3_blob_location',
          data: {
            location: location,
            assignment_id: this.props.assignment.id,
          }
        };

        $.ajax(requestObj3).then(data3 => {
          window.location.reload();
        });
      });
    });
  }

  render() {
    return <div>
      Yooooo
      <input
        type="file"
        onChange={this.fileChangeHandler}
        accept="audio/mp3,audio/m4a"
      />
      <Upload onClick={this.onClickUpload}>Upload!</Upload>
    </div>;
  }
}

export default AddATrack;
