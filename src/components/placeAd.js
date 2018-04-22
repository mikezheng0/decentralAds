import React, {Component} from "react"
import { connect } from "react-redux"
import { onChangeImgUrl, onChangeLinkUrl, onChangeTitle, onSaveId } from "../actions/adActions"
import styled from 'styled-components'
import { Button } from '../styles/card'
import Advertisement from './ad'
import { utils } from 'web3'
import {Tooltip} from './tooltip'
import Spinner from './spinner'
const TextInput = styled.input`
  display:block;
  border: 1px grey solid;
  border-radius: 8px;
  padding: 10px 14px;
  min-width: 100%;
  font-size: 14px;
  margin-bottom: 10px;
  box-sizing: border-box;
`

const TextLabel = styled.label`
  margin-top:16px;
  display:block;
  font-size: 16px;
  color: #555;
  font-weight:bold;
`

const InteractionContainer = styled.div`
  display:flex;
  justify-content:flex-end;
`

class PlaceAd extends Component {

  componentWillMount(){
    if (this.props.ad){
      this.props.onChangeImgUrl({target: {value: this.props.ad.imageUrl}})
      this.props.onChangeLinkUrl({target: {value: this.props.ad.linkUrl}})
      this.props.onChangeTitle({target: {value: this.props.ad.title}})
      if(this.props.ad.id){
        this.props.onSaveId({target: {value: this.props.ad.id}})
      }
      else{
        this.props.onSaveId({target: {value: ""}})
      }
    } else {
      this.props.onChangeImgUrl({target: {value: ""}})
      this.props.onChangeLinkUrl({target: {value: ""}})
      this.props.onChangeTitle({target: {value: ""}})
      this.props.onSaveId({target: {value: ""}})
    }
  }

  render(){
    const { price, adDescription, imgurl, onChangeImgUrl, linkurl, onChangeLinkUrl, onChangeTitle, title, submitText, submitHandler, isMetamaskInjected, isContractLoading} = this.props
    if (isContractLoading) {
      return <div>
        <Spinner/>
      </div>
    }
    return <div>
      The current price to place this ad is <b>{ utils.fromWei(price, 'ether') } ether</b>
      <br /><br />
      {adDescription}
      <TextLabel htmlFor="imageurl">Ad Image URL</TextLabel>
      <TextInput type="text" name="imageurl" id="imageurl" value={imgurl} onChange={onChangeImgUrl}/>
      <TextLabel htmlFor="linkUrl">Ad Link URL</TextLabel> 
      <TextInput type="text" name="linkUrl" id="linkUrl" value={linkurl} onChange={onChangeLinkUrl}/>
      <TextLabel htmlFor="title">Ad Title</TextLabel>
      <TextInput type="text" name="title" id="title" value={title} onChange={onChangeTitle}/>
      <InteractionContainer>
        <Tooltip renderIf={isMetamaskInjected} content="Please install Metamask to bid on this Ad space">
          <Button onClick={submitHandler} disabled={!isMetamaskInjected}> {submitText} </Button>
        </Tooltip>
      </InteractionContainer>
      <Advertisement ad={{ title, linkUrl:'#', imageUrl:imgurl }} isTopAdvertisement={true} missingMessage="Sample Image" isSample={true}></Advertisement>
    </div>
  }
}

const mapStateToProps = ({imgurl, linkurl, title, id, currentValue, isMetamaskInjected, isContractLoading}) => (
{
  imgurl,
  linkurl,
  title,
  isMetamaskInjected,
  id,
  isContractLoading
})

const mapDispatchToProps = dispatch => {
  return {
    onChangeImgUrl: (event) => dispatch(onChangeImgUrl(event.target.value)),
    onChangeLinkUrl: (event) => dispatch(onChangeLinkUrl(event.target.value)),
    onChangeTitle: (event) => dispatch(onChangeTitle(event.target.value)),
    onSaveId: (event) => dispatch(onSaveId(event.target.value))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PlaceAd)
