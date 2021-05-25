import React from 'react';
import t from 'prop-types';
import { Props } from './interface';

const prefixCls = 'tc-empty';

const Img = () => (
  <svg
    className={`${prefixCls}-svg`}
    width="64px"
    height="41px"
    viewBox="0 0 64 41"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g transform="translate(-472.000000, -1335.000000)">
        <g transform="translate(64.000000, 1114.000000)">
          <g transform="translate(40.000000, 78.000000)">
            <g transform="translate(368.000000, 144.000000)">
              <g>
                <ellipse fill="#F5F5F5" cx="32" cy="33" rx="32" ry="7"></ellipse>
                <g transform="translate(9.000000, 0.000000)" fillRule="nonzero" stroke="#D9D9D9">
                  <path d="M46,12.7605604 L35.8543047,1.25739633 C35.3674414,0.473826605 34.6558789,0 33.9067617,0 L12.0932383,0 C11.3441211,0 10.6325586,0.473950255 10.1456953,1.25739633 L2.61479727e-12,12.7605604 L0,22 L46,22 L46,12.7605604 Z"></path>
                  <path
                    d="M32.6132813,15.9315 C32.6132813,14.3258511 33.6069531,13.000234 34.8396992,13 L46,13 L46,31.1371277 C46,33.2589574 44.6793867,35 43.0504297,35 L2.94957031,35 C1.32052344,35 0,33.2588404 0,31.1371277 L0,13 L11.1603008,13 C12.3930469,13 13.3867188,14.3228085 13.3867188,15.9284574 L13.3867188,15.9496383 C13.3867188,17.5552872 14.3917109,18.8511809 15.624457,18.8511809 L30.375543,18.8511809 C31.6082891,18.8511809 32.6132813,17.5433511 32.6132813,15.9377021 L32.6132813,15.9315 Z"
                    fill="#FAFAFA"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

const Empty: React.FC<Props> = props => {
  const { propStyle, image, description } = props;

  return (
    <div className={prefixCls} style={{ ...propStyle }}>
      {image || <Img />}
      <span className={`${prefixCls}-text`}>{description || '暂无数据'}</span>
    </div>
  );
};

Empty.propTypes = {
  description: t.node,
  image: t.node,
  propStyle: t.any,
};

export default Empty;
