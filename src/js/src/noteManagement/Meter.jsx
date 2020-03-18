import React, { Component } from 'react';
import './style/meter.scss';
import { Popover } from 'antd';
import { getEventInRange, stringToMoment } from '../util.js';
import moment from 'moment';

class Meter extends Component {

  render() {

    const targetArray = getEventInRange(this.props.eventArray, this.props.range);
    const now = moment();
    const end = moment().add(this.props.range, 'days');
    const totalSeconds = this.props.range * 86400;
    const points = [];
    const startText = now.format('YYYY MMMM DD');
    const endText = end.format('YYYY MMMM DD');

    for (const event of targetArray) {
      const m = stringToMoment(event.time);
      const offset = m.diff(now, 'seconds')
      const percentage = Math.floor(900 * offset/totalSeconds)/10 + 4;

      points.push(
        <Popover
          content={m.format('YYYY MMMM DD, hh:mm:ss')}
          title={event.name}
          trigger="hover"
          placement='bottom'
          key={event.name}
        >
          <div className='point' style={{left: percentage + '%'}}></div>
        </Popover>
      );
    }

    return (
      <div className='meter'>
        <h3 className='small_title'>Incomming events in next 30 days</h3>
        <div className='axis'>
          <Popover
            content={
              <div>{startText}</div>
            }
            title="Today"
            trigger="hover"
            placement='bottom'
          >
            <div className='start_point'></div>
          </Popover>
          {points}
          <Popover
            content={
              <div>{endText}</div>
            }
            title="30 days later"
            trigger="hover"
            placement='bottom'
          >
            <div className='end_point'></div>
          </Popover>
        </div>
      </div>
    );
  };
}

export default Meter;

