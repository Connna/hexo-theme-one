import * as React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SocialShare from 'material-ui/svg-icons/social/share';
import { ListItem } from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import { MenuItemI, barMenu } from '../../Interfaces/theme';
import FontIcon from 'material-ui/FontIcon';
import routerHistory from '../../lib/History';
import Divider from 'material-ui/Divider';
import AppState from '../../stateI';
import { connect } from 'react-redux';
import { array_randS } from '../../lib/random';
const url = require('url');
var style = require('./logoCard.less')

interface LogoCardProps {
  img?: string,
  title?: string
  homeToolBar?: barMenu[]
  siteUrl?:string
}

class LogoCard extends React.Component<LogoCardProps, undefined>{

  renderItems(item: MenuItemI) {
    let icon;
    if (typeof item.icon != undefined) icon = <FontIcon className="material-icons">{item.icon}</FontIcon>;
    switch (item.type) {
      case "sitelink":
        return <MenuItem
          primaryText={item.title}
          onClick={() => { routerHistory.push(item.href) }}
          key={item.title + item.type}
          className={style.ListItem} leftIcon={icon}
          menuItems={this.renderLists(item.nested)} />;
      case "link":
        return <MenuItem
          primaryText={item.title}
          onClick={() => { routerHistory.push(item.href) }}
          key={item.title + item.type}
          className={style.ListItem} leftIcon={icon}
          menuItems={this.renderLists(item.nested)} />;
      case "hr":
        return <Divider className={style.divider} key={item.title + item.type} />;
      case "page":
        return <MenuItem
          primaryText={item.title}
          className={style.ListItem}
          key={item.title + item.type}
          onClick={() => { routerHistory.push("/page/" + item.name + "/") }}
          leftIcon={icon}
          menuItems={this.renderLists(item.nested)} />;
      default:
        return <MenuItem className={style.ListItem}
          primaryText={item.title}
          leftIcon={icon}
          key={item.title + item.type}
          menuItems={this.renderLists(item.nested)} />
    }
  }
  renderLists(itemList: MenuItemI[]): JSX.Element[] {
    if (typeof itemList === "undefined") return [];
    return itemList.map((value) => {
      return this.renderItems(value)
    })
  }

  renderMenu(itemList: barMenu[]): JSX.Element[] {
    return itemList.map((value,index) => {
      let {items = [],icon} = value;
      return (<IconMenu
        key={index}
        iconButtonElement={<IconButton iconClassName={icon}></IconButton>}
      >
        {
          this.renderLists(items)
        }
      </IconMenu>)
    })
  }

  render() {
    let {img = "", title = "",homeToolBar = [],siteUrl = "/"} = this.props
    img = url.resolve(siteUrl, img);
    return (
      <Card className={style.LogoCard}>
        <CardMedia>
          <div
            className={style.CardImage}
            style={{ backgroundImage: "url(" + img + ")" }}
          >
          </div>
        </CardMedia>
        <div className={style.CardBottom}>
          <CardText>
            {
              title
            }
          </CardText>
          <div className="flexFull"></div>
          {
            this.renderMenu(homeToolBar)
          }
        </div>
      </Card>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  let { site = {}, theme = {} } = state;
  let { title = '' } = site;
  let { img = {},homeToolBar=[] } = theme;
  return {
    title,
    siteUrl: site.siteUrl,
    img: array_randS(img.right_pic),
    homeToolBar
  }
}

let LogoCardX = connect<AppState, LogoCardProps, LogoCardProps>(mapStateToProps)(LogoCard as any)

export default LogoCardX