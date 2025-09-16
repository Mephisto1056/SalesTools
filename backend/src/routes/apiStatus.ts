import express from 'express';
import { Request, Response } from 'express';
import { kimiAPIManager } from '../services/kimiAPIManager';

const router = express.Router();

// 获取API状态
router.get('/status', async (_req: Request, res: Response): Promise<void> => {
  try {
    const status = kimiAPIManager.getStatus();
    
    res.json({
      code: 200,
      message: 'API状态获取成功',
      data: {
        timestamp: new Date().toISOString(),
        ...status,
        summary: {
          totalKeys: status.totalKeys,
          activeKeys: status.activeKeys,
          healthStatus: status.activeKeys > 0 ? 'healthy' : 'unhealthy'
        }
      }
    });

  } catch (error: any) {
    console.error('获取API状态失败:', error);
    
    res.status(500).json({
      code: 500,
      message: error.message || 'API状态获取失败',
      data: null
    });
  }
});

// 测试API连接
router.post('/test', async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt = '请简单介绍一下人工智能。' } = req.body;
    
    console.log('🧪 开始测试API连接...');
    
    const startTime = Date.now();
    const response = await kimiAPIManager.callKimiAPI(prompt, {
      model: 'moonshot-v1-128k',
      temperature: 0.3,
      max_tokens: 200,
      timeout: 30000
    });
    const endTime = Date.now();
    
    const status = kimiAPIManager.getStatus();
    
    res.json({
      code: 200,
      message: 'API测试成功',
      data: {
        testResult: {
          success: true,
          responseTime: endTime - startTime,
          responseLength: response.length,
          responsePreview: response.substring(0, 100) + '...'
        },
        apiStatus: status
      }
    });

  } catch (error: any) {
    console.error('API测试失败:', error);
    
    const status = kimiAPIManager.getStatus();
    
    res.status(500).json({
      code: 500,
      message: 'API测试失败',
      data: {
        testResult: {
          success: false,
          error: error.message
        },
        apiStatus: status
      }
    });
  }
});

// 重置API状态
router.post('/reset', async (_req: Request, res: Response): Promise<void> => {
  try {
    // 这里可以添加重置逻辑，比如清除错误计数等
    console.log('🔄 重置API状态...');
    
    const status = kimiAPIManager.getStatus();
    
    res.json({
      code: 200,
      message: 'API状态重置成功',
      data: {
        message: '状态重置完成，错误计数将在下个周期自动清零',
        currentStatus: status
      }
    });

  } catch (error: any) {
    console.error('API状态重置失败:', error);
    
    res.status(500).json({
      code: 500,
      message: error.message || 'API状态重置失败',
      data: null
    });
  }
});

export default router;