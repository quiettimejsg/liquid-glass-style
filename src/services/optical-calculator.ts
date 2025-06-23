export interface MousePosition {
  x: number;
  y: number;
}

export interface SurfaceParams {
  refractiveIndex: number;
  roughness: number;
  curvature: number;
}

export interface OpticalResult {
  refractionAngle: number;
  reflectionIntensity: number;
  highlightPosition: { x: number; y: number };
  shadowParams: { offsetX: number; offsetY: number; blur: number };
  intensity: number;
}

/**
 * 计算光线在玻璃态表面的折射和反射效果
 * @param mousePosition 鼠标位置
 * @param surfaceParams 表面参数
 * @param lightIntensity 光线强度
 * @returns 光学计算结果
 */
export function calculateLightRefraction(
  mousePosition: MousePosition,
  surfaceParams: SurfaceParams,
  lightIntensity: number
): OpticalResult {
  // 模拟入射角度计算 (0-90度)
  const incidenceAngle = Math.min(89, Math.max(1, (mousePosition.x / 1000) * 90));
  const radiansAngle = incidenceAngle * (Math.PI / 180);

  // 应用斯内尔定律计算折射角
  const refractionAngle = Math.asin(
    Math.sin(radiansAngle) / surfaceParams.refractiveIndex
  ) * (180 / Math.PI);

  // 使用菲涅尔方程计算反射强度
  const reflectionIntensity = (
    (Math.sin(radiansAngle - refractionAngle * (Math.PI / 180)) ** 2 /
      Math.sin(radiansAngle + refractionAngle * (Math.PI / 180)) ** 2) +
    (Math.tan(radiansAngle - refractionAngle * (Math.PI / 180)) ** 2 /
      Math.tan(radiansAngle + refractionAngle * (Math.PI / 180)) ** 2)
  ) / 2 * lightIntensity;

  // 计算高光位置
  const highlightPosition = {
    x: mousePosition.x * (1 + surfaceParams.curvature * 0.1),
    y: mousePosition.y * (1 + surfaceParams.curvature * 0.1)
  };

  // 计算阴影参数
  const shadowParams = {
    offsetX: Math.cos(radiansAngle) * 5 * surfaceParams.roughness,
    offsetY: Math.sin(radiansAngle) * 5 * surfaceParams.roughness,
    blur: 10 * surfaceParams.roughness
  };

  return {
    refractionAngle,
    reflectionIntensity,
    highlightPosition,
    shadowParams,
    intensity: lightIntensity
  };
}